import { Check, User, FileText, Landmark } from 'lucide-react';
import { useFormContext } from '../context/FormContext';

export default function StepIndicator() {
  const { currentStep, goToStep, termsAccepted } = useFormContext();

  const steps = [
    {
      number: 1,
      title: 'Informations',
      fullTitle: 'Informations du dossier',
      desc: 'Référence et identité',
      icon: User,
    },
    {
      number: 2,
      title: 'Conditions',
      fullTitle: 'Conditions générales',
      desc: 'Validation des modalités',
      icon: FileText,
    },
    {
      number: 3,
      title: 'Instructions',
      fullTitle: 'Virement & Coordonnées',
      desc: 'IBAN et bordereau',
      icon: Landmark,
    },
  ];

  const handleStepClick = (stepNumber) => {
    if (stepNumber === currentStep) return;
    if (stepNumber < currentStep) {
      goToStep(stepNumber);
    } else if (stepNumber === 2 && currentStep === 1) {
      goToStep(2);
    } else if (stepNumber === 3 && currentStep === 2 && termsAccepted) {
      goToStep(3);
    }
  };

  return (
    <nav aria-label="Étapes de la démarche" className="w-full max-w-4xl mx-auto mb-8 px-2 sm:px-4 no-print">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-5 shadow-xs">
        <ol className="grid grid-cols-3 gap-2 sm:gap-4 items-stretch">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isAccessible = step.number < currentStep || (step.number === 2 && currentStep === 1);
            const StepIcon = step.icon;

            return (
              <li key={step.number} className="relative flex">
                <button
                  type="button"
                  onClick={() => handleStepClick(step.number)}
                  disabled={!isAccessible && !isCurrent}
                  className={`w-full flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3.5 p-2.5 sm:p-3.5 rounded-xl transition-all ${isCurrent
                    ? 'bg-blue-50/70 border-2 border-[#0b6ba8] shadow-xs'
                    : isCompleted
                      ? 'bg-white hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-300 shadow-2xs cursor-pointer'
                      : 'bg-slate-50/70 border border-slate-200/80 shadow-2xs cursor-not-allowed'
                    }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {/* Step Icon Badge */}
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm transition-transform flex-shrink-0 ${isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isCurrent
                        ? 'bg-[#0b6ba8] text-white shadow-xs ring-4 ring-blue-100'
                        : 'bg-white text-slate-400 border border-slate-300 shadow-2xs'
                      }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
                    ) : (
                      <span className="flex items-center gap-1 font-bold">
                        <StepIcon className="w-3.5 h-3.5 sm:hidden" />
                        <span className="hidden sm:inline">{step.number}</span>
                      </span>
                    )}
                  </div>

                  {/* Step Text */}
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-[10px] sm:text-[11px] uppercase tracking-wider font-bold ${isCurrent
                        ? 'text-[#0b6ba8]'
                        : isCompleted
                          ? 'text-emerald-700'
                          : 'text-slate-400'
                        }`}
                    >
                      Étape {step.number}
                    </span>
                    <span
                      className={`text-xs sm:text-sm truncate ${isCurrent
                        ? 'font-extrabold text-slate-900'
                        : isCompleted
                          ? 'font-bold text-slate-800'
                          : 'font-semibold text-slate-600'
                        }`}
                    >
                      <span className="sm:hidden">{step.title}</span>
                      <span className="hidden sm:inline">{step.fullTitle}</span>
                    </span>
                    <span
                      className={`text-[11px] hidden md:block truncate ${isCurrent
                        ? 'text-slate-600 font-medium'
                        : isCompleted
                          ? 'text-slate-500'
                          : 'text-slate-400'
                        }`}
                    >
                      {step.desc}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-200/80 h-2 rounded-full mt-3 sm:mt-4 overflow-hidden">
          <div
            className="h-full bg-[#0b6ba8] transition-all duration-300 ease-out rounded-full"
            style={{
              width: currentStep === 1 ? '33.33%' : currentStep === 2 ? '66.66%' : '100%',
            }}
          />
        </div>
      </div>
    </nav>
  );
}
