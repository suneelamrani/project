import { ArrowRight, ArrowLeft, Bookmark, AlertCircle } from 'lucide-react';
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
            Veuillez lire attentivement les dispositions réglementaires relatives au virement bancaire ci-dessous.
          </p>
        </div>
      </div>

      {/* Main Administrative Document Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
        {/* Dossier Reference Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-slate-700" />
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

        {/* ======================================================== */}
        {/* OFFICIAL ADMINISTRATIVE DOCUMENT FORMATTING              */}
        {/* (Clean legal document structure, no blog quote cards)    */}
        {/* ======================================================== */}
        <div className="bg-white border border-slate-300 rounded-xl p-6 sm:p-10 shadow-2xs divide-y divide-slate-200">
          {/* Article 1 */}
          <div className="pb-6 space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {organizationConfig.termsAndConditions.section1.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {organizationConfig.termsAndConditions.section1.body}
            </p>
          </div>

          {/* Article 2 */}
          <div className="pt-6 pb-6 space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {organizationConfig.termsAndConditions.section2.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {organizationConfig.termsAndConditions.section2.body}
            </p>
          </div>

          {/* Mandatory Checkbox Agreement - Administrative Format */}
          <div className="pt-6">
            <div
              className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
                termsAccepted
                  ? 'border-emerald-600 bg-emerald-50/30'
                  : 'border-slate-300 bg-slate-50/60 hover:border-slate-400'
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
                  <span className="text-sm sm:text-base font-bold text-slate-900 block">
                    {organizationConfig.termsAndConditions.mandatoryCheckboxLabel}
                  </span>
                  <span className="text-xs text-slate-600 block leading-relaxed">
                    Je reconnais avoir pris connaissance des modalités ci-dessus et je m'engage à indiquer fidèlement le numéro de dossier dans l'ordre de virement bancaire.
                  </span>
                </div>
              </label>
            </div>

            {!termsAccepted && (
              <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-2.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>La confirmation d'acceptation est requise pour débloquer l'accès aux coordonnées de virement.</span>
              </p>
            )}
          </div>
        </div>

        {/* Administrative notice */}
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
