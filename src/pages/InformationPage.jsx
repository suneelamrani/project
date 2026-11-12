import { ArrowRight, Hash, User, Mail, Phone, HelpCircle, ShieldAlert, Lock } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import FormInput from '../components/FormInput';
import NoticeBanner from '../components/NoticeBanner';

export default function InformationPage() {
  const {
    formData,
    errors,
    touched,
    updateFormField,
    markTouched,
    nextStep,
  } = useFormContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Human-Designed White & Blue Intro Banner */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 border-l-4 border-l-[#002a40] shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#002a40] text-xs font-bold mb-2.5 border border-blue-200">
            <span>Étape 1 sur 3</span>
            <span>•</span>
            <span>Identification du Redevable</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#002a40] mb-2">
            Règlement de votre dossier d'amende
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Consultez les détails de votre dossier ci-dessous et complétez vos coordonnées afin d'accéder au bordereau officiel de virement bancaire SEPA.
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        {/* Security & Instruction Alert in Clean Blue */}
        <NoticeBanner type="info" title="Informations officielles du dossier">
          <p>
            Le numéro de référence du dossier et le montant forfaitaire sont fixés administrativement. Veuillez renseigner vos coordonnées pour permettre l'émission et l'affectation comptable de votre règlement.
          </p>
        </NoticeBanner>

        {/* Section 1: Official Folder Reference & Price (Fixed by Administrator) */}
        <div className="bg-slate-50/70 rounded-xl p-5 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-[#002a40]" />
              <h2 className="text-base font-bold text-slate-900">
                Paramètres officiels du dossier d'amende
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002a40] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              <Lock className="w-3.5 h-3.5 text-blue-700" />
              <span>Fixé par l'administration</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Folder Reference Card */}
            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-semibold text-slate-500 block">
                Numéro de référence du dossier
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg sm:text-xl font-bold text-[#002a40] tracking-wider">
                  {formData.reference}
                </span>
                <span className="text-[11px] font-bold text-[#002a40] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  Dossier Attribué
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Référence officielle obligatoire pour le virement SEPA.
              </p>
            </div>

            {/* Price / Amount Card */}
            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-semibold text-slate-500 block">
                Montant réglementaire forfaitaire
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg sm:text-xl font-black text-slate-900">
                  {formData.amount} € EUR
                </span>
                <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  Tarif Réglementaire
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Montant total net sans frais supplémentaires.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Client Identity Details */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <User className="w-4 h-4 text-[#002a40]" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Coordonnées du destinataire / redevable
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="fullName"
                name="fullName"
                label="Nom et Prénom (ou Raison Sociale)"
                placeholder="Ex : Dupont Martine"
                value={formData.fullName}
                onChange={(e) => updateFormField('fullName', e.target.value)}
                onBlur={() => markTouched('fullName')}
                error={touched.fullName ? errors.fullName : null}
                required
                icon={User}
                helperText="Nom figurant sur l'avis de contravention."
              />

              <FormInput
                id="email"
                name="email"
                type="email"
                label="Adresse e-mail de contact"
                placeholder="Ex : martine.dupont@exemple.fr"
                value={formData.email}
                onChange={(e) => updateFormField('email', e.target.value)}
                onBlur={() => markTouched('email')}
                error={touched.email ? errors.email : null}
                required
                icon={Mail}
                helperText="Pour recevoir le récapitulatif du bordereau de virement."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="phone"
                name="phone"
                type="tel"
                label="Numéro de téléphone"
                placeholder="Ex : 06 12 34 56 78"
                value={formData.phone}
                onChange={(e) => updateFormField('phone', e.target.value)}
                onBlur={() => markTouched('phone')}
                error={touched.phone ? errors.phone : null}
                required
                icon={Phone}
                helperText="Format : 10 chiffres (ex. 06 12 34 56 78) ou indicatif international."
              />
            </div>
          </div>

          {/* Understated Administrative Privacy Notice */}
          <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#002a40]">
              <ShieldAlert className="w-4 h-4 text-blue-700" />
              <span>Garantie de transparence et de sécurité</span>
            </div>
            <p>
              Ce formulaire ne vous demandera jamais votre code secret, votre mot de passe bancaire ou votre numéro de carte bancaire. Le règlement s'effectue directement depuis votre application bancaire par virement SEPA vers le compte vérifié de l'organisme.
            </p>
          </div>

          {/* Action Button: Authentic French Institutional Navy Blue */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Étape suivante : prise de connaissance des conditions générales</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-[#0b6ba8] hover:bg-[#002a40] active:bg-[#085485] text-white font-semibold text-sm shadow-xs transition-colors focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer"
            >
              <span>Continuer vers les conditions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
