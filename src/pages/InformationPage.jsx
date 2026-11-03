import { ArrowRight, Hash, User, Mail, Phone, Euro, Calendar, HelpCircle, ShieldAlert } from 'lucide-react';
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
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md border border-slate-800">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30">
            <span>Étape 1 sur 3</span>
            <span>•</span>
            <span>Identification du Dossier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Règlement de votre dossier d'amende
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Ce portail vous permet d'obtenir les coordonnées bancaires officielles et le bordereau de virement SEPA pour le règlement de votre amende en toute conformité.
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        {/* Security & Instruction Alert */}
        <NoticeBanner type="info" title="Instructions préalables au règlement" className="mb-6">
          <p>
            Veuillez renseigner le <strong>numéro de référence exact de votre dossier</strong> tel qu’il figure sur votre avis ou notification. Cette référence sera obligatoirement reportée dans le motif de votre virement bancaire pour garantir l’affectation immédiate des fonds.
          </p>
        </NoticeBanner>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Section: Dossier Reference */}
          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/90 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-blue-700" />
                <h2 className="text-base font-bold text-slate-900">
                  Référence du dossier d'amende
                </h2>
              </div>
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                Champ obligatoire
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="reference"
                name="reference"
                label="Numéro de référence du dossier"
                placeholder="Ex : DOS-2026-78492"
                value={formData.reference}
                onChange={(e) => updateFormField('reference', e.target.value.toUpperCase())}
                onBlur={() => markTouched('reference')}
                error={touched.reference ? errors.reference : null}
                required
                icon={Hash}
                helperText="Indiquez la référence complète figurant sur votre document d'avis."
                badge="Reporté sur le virement"
              />

              <FormInput
                id="amount"
                name="amount"
                label="Montant de l'amende à régler"
                type="text"
                placeholder="135.00"
                value={formData.amount}
                onChange={(e) => updateFormField('amount', e.target.value)}
                onBlur={() => markTouched('amount')}
                error={touched.amount ? errors.amount : null}
                required
                icon={Euro}
                helperText="Montant forfaitaire réglementaire en euros (€)."
                badge="Devise : EUR"
              />
            </div>
          </div>

          {/* Section: Client Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <User className="w-4 h-4 text-blue-700" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Identité du destinataire / redevable
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
                label="Numéro de téléphone (optionnel)"
                placeholder="Ex : 06 12 34 56 78"
                value={formData.phone}
                onChange={(e) => updateFormField('phone', e.target.value)}
                onBlur={() => markTouched('phone')}
                error={touched.phone ? errors.phone : null}
                icon={Phone}
                helperText="Utilisé uniquement en cas de besoin de suivi du dossier."
              />

              <FormInput
                id="date"
                name="date"
                label="Date de la démarche"
                value={formData.date}
                readOnly
                icon={Calendar}
                helperText="Date d'émission de l'ordre d'instructions."
              />
            </div>
          </div>

          {/* Security & Transparency Note */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>Garantie de transparence et de sécurité</span>
            </div>
            <p>
              Ce formulaire ne vous demandera jamais votre code secret, votre mot de passe bancaire ou votre numéro de carte bancaire. Le règlement s'effectue directement depuis votre application bancaire par virement SEPA vers le compte vérifié de l'organisme.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Étape suivante : prise de connaissance des conditions générales</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 cursor-pointer"
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
