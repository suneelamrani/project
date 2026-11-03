import { createContext, useContext, useState, useEffect } from 'react';
import { organizationConfig } from '../config/organization';

const FormContext = createContext(null);

function getInitialTodayDate() {
  const today = new Date();
  return today.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function getInitialDossierParams() {
  if (typeof window !== 'undefined' && window.location) {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref') || params.get('reference');
    const amountParam = params.get('amount') || params.get('montant');
    return {
      reference: refParam || organizationConfig.dossier.reference,
      amount: amountParam || organizationConfig.dossier.amount,
    };
  }
  return {
    reference: organizationConfig.dossier.reference,
    amount: organizationConfig.dossier.amount,
  };
}

export function FormProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState(() => {
    const initialParams = getInitialDossierParams();
    return {
      reference: initialParams.reference,
      amount: initialParams.amount,
      fullName: '',
      email: '',
      phone: '',
      emissionDate: getInitialTodayDate(),
      infractionType: organizationConfig.dossier.infractionType,
    };
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const updateFormField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = null;

    if (field === 'fullName') {
      if (!value || !value.trim()) {
        error = 'Le nom et prénom sont obligatoires.';
      } else if (value.trim().length < 2) {
        error = 'Veuillez saisir un nom valide (au moins 2 caractères).';
      }
    }

    if (field === 'email') {
      if (!value || !value.trim()) {
        error = 'L’adresse e-mail est obligatoire pour l’envoi de la confirmation.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        error = 'Veuillez saisir une adresse e-mail valide (ex. nom@domaine.fr).';
      }
    }

    if (field === 'phone') {
      if (!value || !value.trim()) {
        error = 'Le numéro de téléphone est obligatoire.';
      } else if (!/^[0-9\s+().-]{8,20}$/.test(value.trim())) {
        error = 'Numéro de téléphone invalide (au moins 8 chiffres).';
      }
    }

    setErrors((prev) => {
      const updated = { ...prev };
      if (error) {
        updated[field] = error;
      } else {
        delete updated[field];
      }
      return updated;
    });

    return !error;
  };

  const validateStep1 = () => {
    const fieldsToValidate = ['fullName', 'email', 'phone'];
    let isValid = true;
    const newErrors = {};

    fieldsToValidate.forEach((field) => {
      const val = formData[field];
      if (field === 'fullName') {
        if (!val || !val.trim()) {
          newErrors.fullName = 'Le nom et prénom sont obligatoires.';
          isValid = false;
        } else if (val.trim().length < 2) {
          newErrors.fullName = 'Veuillez saisir un nom valide (au moins 2 caractères).';
          isValid = false;
        }
      }

      if (field === 'email') {
        if (!val || !val.trim()) {
          newErrors.email = 'L’adresse e-mail est obligatoire.';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
          newErrors.email = 'Veuillez saisir une adresse e-mail valide.';
          isValid = false;
        }
      }

      if (field === 'phone') {
        if (!val || !val.trim()) {
          newErrors.phone = 'Le numéro de téléphone est obligatoire.';
          isValid = false;
        } else if (!/^[0-9\s+().-]{8,20}$/.test(val.trim())) {
          newErrors.phone = 'Numéro de téléphone invalide.';
          isValid = false;
        }
      }
    });

    setTouched({
      fullName: true,
      email: true,
      phone: true,
    });
    setErrors(newErrors);

    return isValid;
  };

  const goToStep = (stepNumber) => {
    if (stepNumber === 1) {
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (stepNumber === 2) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        showToast('Veuillez renseigner correctement les champs obligatoires.');
      }
      return;
    }

    if (stepNumber === 3) {
      if (!validateStep1()) {
        setCurrentStep(1);
        showToast('Veuillez compléter vos informations.');
        return;
      }
      if (!termsAccepted) {
        setCurrentStep(2);
        showToast('Vous devez accepter les conditions générales pour continuer.');
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (currentStep === 2) {
      if (termsAccepted) {
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    const initialParams = getInitialDossierParams();
    setFormData({
      reference: initialParams.reference,
      amount: initialParams.amount,
      fullName: '',
      email: '',
      phone: '',
      emissionDate: getInitialTodayDate(),
      infractionType: organizationConfig.dossier.infractionType,
    });
    setTermsAccepted(false);
    setErrors({});
    setTouched({});
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        termsAccepted,
        errors,
        touched,
        toastMessage,
        showToast,
        setTermsAccepted,
        updateFormField,
        markTouched,
        validateField,
        validateStep1,
        goToStep,
        nextStep,
        prevStep,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
