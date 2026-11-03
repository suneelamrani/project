import { createContext, useContext, useState, useEffect } from 'react';
import { organizationConfig } from '../config/organization';

const FormContext = createContext(null);

// Pure helper function for initial date
function getInitialTodayDate() {
  const today = new Date();
  return today.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function FormProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState(() => ({
    reference: 'DOS-2026-78492',
    fullName: '',
    email: '',
    phone: '',
    amount: organizationConfig.defaults.amount,
    date: getInitialTodayDate(),
    infractionType: 'Amende forfaitaire de stationnement',
  }));

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  // Auto-hide toast notification
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
    // Clear error for this field as user types
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

    if (field === 'reference') {
      if (!value || !value.trim()) {
        error = 'Le numéro de référence du dossier est obligatoire.';
      } else if (value.trim().length < 4) {
        error = 'La référence doit comporter au moins 4 caractères.';
      } else if (!/^[A-Za-z0-9\-_./]+$/.test(value.trim())) {
        error = 'Format de référence invalide (caractères autorisés : lettres, chiffres, tirets).';
      }
    }

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

    if (field === 'phone' && value && value.trim()) {
      if (!/^[0-9\s+().-]{8,20}$/.test(value.trim())) {
        error = 'Numéro de téléphone invalide.';
      }
    }

    if (field === 'amount') {
      const numeric = parseFloat(value);
      if (isNaN(numeric) || numeric <= 0) {
        error = 'Le montant doit être un nombre positif valide.';
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
    const fieldsToValidate = ['reference', 'fullName', 'email'];
    let isValid = true;
    const newErrors = {};

    fieldsToValidate.forEach((field) => {
      const val = formData[field];
      if (field === 'reference') {
        if (!val || !val.trim()) {
          newErrors.reference = 'Le numéro de référence du dossier est obligatoire.';
          isValid = false;
        } else if (val.trim().length < 4) {
          newErrors.reference = 'La référence doit comporter au moins 4 caractères.';
          isValid = false;
        } else if (!/^[A-Za-z0-9\-_./]+$/.test(val.trim())) {
          newErrors.reference = 'Format de référence invalide (caractères autorisés : lettres, chiffres, tirets).';
          isValid = false;
        }
      }

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
    });

    setTouched({
      reference: true,
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
    setFormData({
      reference: '',
      fullName: '',
      email: '',
      phone: '',
      amount: organizationConfig.defaults.amount,
      date: getInitialTodayDate(),
      infractionType: 'Amende forfaitaire de stationnement',
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
