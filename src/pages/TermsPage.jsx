import { ArrowRight, ArrowLeft, FileText, AlertCircle, Bookmark } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { organizationConfig } from '../config/organization';

export default function TermsPage() {
  const {
    formData,
    termsAccepted,
    setTermsAccepted,
    nextStep,
    prevStep,
  } = useFormContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (termsAccepted) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md border border-slate-800">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30">
            <span>Étape 2 sur 3</span>
            <span>•</span>
            <span>Conditions d'Acceptation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Conditions générales de règlement
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Veuillez lire attentivement les dispositions relatives au règlement par virement bancaire ci-dessous avant d'accéder aux coordonnées de virement.
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Recapitulative dossier pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-blue-700" />
            <span className="text-slate-600">Dossier en cours :</span>
            <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
              {formData.reference || 'DOSSIER-NON-DEFINI'}
            </span>
          </div>
          {formData.fullName && (
            <div className="text-slate-600">
              Redevable : <strong className="text-slate-900">{formData.fullName}</strong>
            </div>
          )}
          <div className="text-slate-600">
            Montant : <strong className="text-slate-900">{formData.amount} €</strong>
          </div>
        </div>

        {/* Professional Document Style Presentation */}
        <div className="relative border-2 border-slate-200/90 rounded-2xl p-5 sm:p-8 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 shadow-xs">
          {/* Document Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Protocole de Règlement par Virement
                </h2>
                <p className="text-xs text-slate-500">
                  {organizationConfig.legalName} • Document officiel de référence
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 hidden sm:inline-block">
              Texte Intégral
            </span>
          </div>

          {/* Clauses / Exact French Content */}
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            {/* Clause 1 */}
            <article className="space-y-2 p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 text-xs font-extrabold flex items-center justify-center border border-blue-200">
                  1
                </span>
                {organizationConfig.termsAndConditions.section1.title}
              </h3>
              <p className="text-slate-700 sm:text-justify italic bg-slate-50/60 p-3.5 rounded-lg border-l-4 border-blue-700 font-serif text-sm sm:text-base leading-relaxed">
                {organizationConfig.termsAndConditions.section1.body}
              </p>
            </article>

            {/* Clause 2 */}
            <article className="space-y-2 p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 text-xs font-extrabold flex items-center justify-center border border-blue-200">
                  2
                </span>
                {organizationConfig.termsAndConditions.section2.title}
              </h3>
              <p className="text-slate-700 sm:text-justify italic bg-slate-50/60 p-3.5 rounded-lg border-l-4 border-blue-700 font-serif text-sm sm:text-base leading-relaxed">
                {organizationConfig.termsAndConditions.section2.body}
              </p>
            </article>
          </div>

          {/* Mandatory Checkbox Agreement */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div
              className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
                termsAccepted
                  ? 'border-emerald-500 bg-emerald-50/40'
                  : 'border-slate-300 bg-slate-50/70 hover:border-slate-400'
              }`}
            >
              <label
                htmlFor="termsCheckbox"
                className="flex items-start gap-3.5 cursor-pointer select-none"
              >
                <div className="relative flex items-center justify-center flex-shrink-0 mt-0.5">
                  <input
                    id="termsCheckbox"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-5 h-5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 focus:ring-2 cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-bold text-slate-900 block">
                    {organizationConfig.termsAndConditions.mandatoryCheckboxLabel}
                  </span>
                  <span className="text-xs text-slate-500 block">
                    En cochant cette case, vous certifiez l'exactitude des informations renseignées et vous vous engagez à reporter scrupuleusement la référence de votre dossier lors de l'émission de votre virement bancaire.
                  </span>
                </div>
              </label>
            </div>

            {/* Validation warning if un-checked */}
            {!termsAccepted && (
              <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-2.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>L'acceptation de ces conditions est requise pour débloquer l'accès aux coordonnées bancaires.</span>
              </p>
            )}
          </div>
        </div>

        {/* Local validation disclaimer */}
        <p className="text-[11px] text-slate-500 text-center italic">
          {organizationConfig.disclaimers.localConsentNote}
        </p>

        {/* Navigation Action Buttons */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={prevStep}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux informations</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!termsAccepted}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-4 cursor-pointer ${
              termsAccepted
                ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-md hover:shadow-lg focus:ring-blue-100 cursor-pointer'
                : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Voir les instructions de virement</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
