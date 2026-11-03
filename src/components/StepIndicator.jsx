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
    // Only allow clicking to navigate if the step is accessible
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
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-3 sm:p-5 shadow-xs">
        <ol className="grid grid-cols-3 gap-2 sm:gap-4 items-center">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isAccessible = step.number < currentStep || (step.number === 2 && currentStep === 1);
            const StepIcon = step.icon;

            return (
              <li key={step.number} className="relative">
                <button
                  type="button"
                  onClick={() => handleStepClick(step.number)}
                  disabled={!isAccessible && !isCurrent}
                  className={`w-full flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 p-2 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-blue-50/80 border border-blue-200 shadow-xs'
                      : isCompleted
                      ? 'hover:bg-slate-50 cursor-pointer'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {/* Step Icon Badge */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm transition-transform flex-shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-blue-700 text-white shadow-sm ring-4 ring-blue-100'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white stroke-[2.5]" />
                    ) : (
                      <span className="flex items-center gap-1">
                        <StepIcon className="w-4 h-4 sm:hidden" />
                        <span className="hidden sm:inline">{step.number}</span>
                      </span>
                    )}
                  </div>

                  {/* Step Text */}
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-[11px] uppercase tracking-wider font-semibold ${
                        isCurrent
                          ? 'text-blue-700'
                          : isCompleted
                          ? 'text-emerald-700'
                          : 'text-slate-400'
                      }`}
                    >
                      Étape {step.number}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-bold truncate ${
                        isCurrent
                          ? 'text-slate-900'
                          : isCompleted
                          ? 'text-slate-700'
                          : 'text-slate-500'
                      }`}
                    >
                      <span className="sm:hidden">{step.title}</span>
                      <span className="hidden sm:inline">{step.fullTitle}</span>
                    </span>
                    <span className="text-[11px] text-slate-400 hidden md:block truncate">
                      {step.desc}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 sm:mt-4 overflow-hidden">
          <div
            className="h-full bg-blue-700 transition-all duration-300 ease-out rounded-full"
            style={{
              width: currentStep === 1 ? '33.33%' : currentStep === 2 ? '66.66%' : '100%',
            }}
          />
        </div>
      </div>
    </nav>
  );
}

