import { useMemo } from 'react';
import { Printer, ArrowLeft, Landmark, Hash, User, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import CopyButton from '../components/CopyButton';
import OrganizationLogo from '../components/OrganizationLogo';
import { organizationConfig } from '../config/organization';

export default function InvoicePage() {
  const { formData, prevStep, goToStep } = useFormContext();

  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = useMemo(() => {
    const cleanRef = (formData.reference || '0001').replace(/[^A-Za-z0-9]/g, '');
    return `BOR-${cleanRef}`;
  }, [formData.reference]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top action bar: Print & Navigation (hidden during print) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs no-print">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold border border-slate-300 transition-colors cursor-pointer w-full sm:w-auto justify-center"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour aux conditions</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-600 hover:text-blue-700 hover:bg-blue-50 text-xs font-semibold transition-colors cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>Modifier informations</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer w-full sm:w-auto"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer / Télécharger en PDF</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PROFESSIONAL FINANCIAL INVOICE / BORDEREAU DOCUMENT CARD */}
      {/* ======================================================== */}
      <div
        id="invoice-document"
        className="bg-white rounded-2xl border-2 border-slate-300 shadow-md p-6 sm:p-10 md:p-12 space-y-8 print:shadow-none print:border print:border-slate-400 print:p-6 print:rounded-none"
      >
        {/* Document Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b-2 border-slate-900 pb-8">
          <div>
            <OrganizationLogo className="mb-3" />
            <div className="text-xs text-slate-600 space-y-0.5 mt-2">
              <p className="font-bold text-slate-900">{organizationConfig.legalName}</p>
              <p>{organizationConfig.entityType} • SIRET : {organizationConfig.siret}</p>
              <p>{organizationConfig.contact.addressLine1}, {organizationConfig.contact.postalCode} {organizationConfig.contact.city}</p>
              <p>Tél : {organizationConfig.contact.phone} • Email : {organizationConfig.contact.email}</p>
            </div>
          </div>

          <div className="flex flex-col md:items-end text-left md:text-right">
            <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-md mb-2">
              DOCUMENT OFFICIEL DE RÈGLEMENT
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              BORDEREAU D'INSTRUCTIONS SEPA
            </h1>
            <p className="text-xs font-mono text-slate-500 mt-1">
              N° d'émission : <span className="font-bold text-slate-800">{invoiceNumber}</span>
            </p>
            <p className="text-xs text-slate-500">
              Date d'émission : <span className="font-semibold text-slate-800">{formData.date}</span>
            </p>
            <p className="text-xs text-slate-500">
              Mode de paiement : <span className="font-bold text-blue-900">{organizationConfig.bankDetails.paymentType}</span>
            </p>
          </div>
        </div>

        {/* 2-Columns: Client Details & Assigned Representative */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
          {/* Recipient / Debtor info */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Redevable / Titulaire du dossier
            </span>
            <p className="text-base font-bold text-slate-900">
              {formData.fullName || 'Destinataire non renseigné'}
            </p>
            {formData.email && (
              <p className="text-xs text-slate-600">
                E-mail : <span className="text-slate-800 font-medium">{formData.email}</span>
              </p>
            )}
            {formData.phone && (
              <p className="text-xs text-slate-600">
                Téléphone : <span className="text-slate-800 font-medium">{formData.phone}</span>
              </p>
            )}
            <p className="text-xs text-slate-600">
              Nature de l'amende : <span className="text-slate-800 font-medium">{formData.infractionType}</span>
            </p>
          </div>

          {/* Responsible Authority Info */}
          <div className="space-y-1.5 md:border-l md:border-slate-200 md:pl-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Service Émetteur & Responsable Désigné
            </span>
            <p className="text-base font-bold text-slate-900">
              {organizationConfig.designatedRepresentative.fullName}
            </p>
            <p className="text-xs text-slate-600">
              {organizationConfig.designatedRepresentative.title}
            </p>
            <p className="text-xs text-slate-600">
              {organizationConfig.designatedRepresentative.department}
            </p>
            <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Coordonnées bancaires officielles vérifiées</span>
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MANDATORY FRENCH WARNING BOX (EXACT WORDING)             */}
        {/* ======================================================== */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-amber-950 space-y-2.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <h2 className="text-base font-black tracking-tight text-amber-950">
              {organizationConfig.transferWarning.label}
            </h2>
          </div>
          <p className="text-sm font-semibold leading-relaxed">
            {organizationConfig.transferWarning.text1}
          </p>
          <p className="text-sm font-semibold leading-relaxed">
            {organizationConfig.transferWarning.text2}
          </p>
        </div>

        {/* ======================================================== */}
        {/* SECTION 1: VISUALLY PROMINENT FOLDER REFERENCE           */}
        {/* ======================================================== */}
        <div className="rounded-2xl border-2 border-blue-600 bg-blue-50/50 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/80 pb-3">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-blue-700" />
              <h2 className="text-sm font-extrabold text-blue-950 uppercase tracking-wider">
                Numéro de référence à reporter sur le virement
              </h2>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200 uppercase">
              Motif obligatoire
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <span className="text-xs text-blue-900 font-medium block">
                Indiquez exactement cette référence dans le champ « Motif » ou « Référence » de votre banque :
              </span>
              <div className="font-mono text-xl sm:text-2xl md:text-3xl font-black text-blue-950 tracking-wider bg-white px-4 py-2 rounded-xl border border-blue-300 inline-block shadow-2xs select-all">
                {formData.reference || 'DOSSIER-NON-DEFINI'}
              </div>
            </div>

            <CopyButton
              text={formData.reference}
              fieldName="Numéro de référence"
              label="Copier la référence"
              className="bg-blue-700 hover:bg-blue-800 text-white border-blue-700 py-2.5 px-4 text-sm shadow-xs"
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 2: VERIFIED ORGANIZATIONAL BANK DETAILS          */}
        {/* ======================================================== */}
        <div className="rounded-2xl border border-slate-300 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Landmark className="w-5 h-5 text-slate-800" />
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
              Coordonnées bancaires vérifiées de l'organisme
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Beneficiary Name */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">
                Bénéficiaire du virement (Titulaire du compte)
              </span>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-sm font-bold text-slate-900">
                  {organizationConfig.bankDetails.accountHolder}
                </span>
                <CopyButton text={organizationConfig.bankDetails.accountHolder} fieldName="Nom du bénéficiaire" />
              </div>
            </div>

            {/* Bank Name */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">
                Établissement bancaire teneur de compte
              </span>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-sm font-bold text-slate-900">
                  {organizationConfig.bankDetails.bankName}
                </span>
              </div>
            </div>
          </div>

          {/* IBAN Prominent Block */}
          <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-xl shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Numéro IBAN (International Bank Account Number)
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Compte SEPA Vérifié
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
              <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold tracking-wider text-emerald-400 select-all">
                {organizationConfig.bankDetails.ibanFormatted}
              </span>
              <CopyButton
                text={organizationConfig.bankDetails.iban.replace(/\s+/g, '')}
                fieldName="Code IBAN"
                label="Copier l'IBAN"
                className="bg-emerald-600 hover:bg-emerald-500 text-white border-transparent text-sm py-2 px-3.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* BIC / SWIFT */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">
                  Code BIC / SWIFT
                </span>
                <span className="font-mono text-sm font-bold text-slate-900 mt-1 block">
                  {organizationConfig.bankDetails.bicSwift}
                </span>
              </div>
              <CopyButton text={organizationConfig.bankDetails.bicSwift} fieldName="Code BIC" />
            </div>

            {/* Total Amount to settle */}
            <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold text-blue-900 block">
                  Montant exact du virement
                </span>
                <span className="font-mono text-base font-black text-blue-950 mt-1 block">
                  {formData.amount} € EUR
                </span>
              </div>
              <CopyButton text={formData.amount} fieldName="Montant" label="Copier montant" />
            </div>
          </div>
        </div>

        {/* Settlement Summary Table */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Récapitulatif des éléments comptables
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-4">Désignation</th>
                  <th className="py-2.5 px-4">Détail d'affectation</th>
                  <th className="py-2.5 px-4 text-right">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    Amende / Dossier de recouvrement
                    <span className="block text-xs font-normal text-slate-500">
                      Réf : {formData.reference}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    Virement SEPA • Compte {organizationConfig.bankDetails.iban.slice(0, 8)}...
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                    {formData.amount} €
                  </td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={2} className="py-3 px-4 text-right text-slate-800">
                    Total net à régler par virement bancaire :
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-base text-blue-900 font-extrabold">
                    {formData.amount} €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Instructions Steps Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Procédure simple pour exécuter votre virement en ligne</span>
          </h2>
          <ol className="text-xs sm:text-sm text-slate-600 space-y-2 list-decimal list-inside pl-1 leading-relaxed">
            <li>
              Connectez-vous à votre espace bancaire habituel (application mobile ou site web).
            </li>
            <li>
              Ajoutez un nouveau bénéficiaire en saisissant l'IBAN officiel : <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-bold text-slate-800">{organizationConfig.bankDetails.ibanFormatted}</code>.
            </li>
            <li>
              Dans le champ <strong>« Référence du virement »</strong> ou <strong>« Motif »</strong>, renseignez impérativement : <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-bold text-blue-900">{formData.reference}</code>.
            </li>
            <li>
              Effectuez le virement d'un montant de <strong>{formData.amount} €</strong>. Un accusé de traitement bancaire vous sera délivré par votre banque sous 24 à 48 heures ouvrées.
            </li>
          </ol>
        </div>

        {/* Document Footer Signoff */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p className="font-semibold text-slate-700">
              {organizationConfig.legalName}
            </p>
            <p className="text-[11px]">
              Document émis informatiquement • Fait foi des coordonnées officielles de paiement
            </p>
          </div>
          <div className="text-right text-[11px]">
            <p>Signature numérique et visa comptable :</p>
            <span className="font-mono text-slate-800 font-bold">
              REF-AUTH-{formData.reference.replace(/[^A-Za-z0-9]/g, '')}-OK
            </span>
          </div>
        </div>
      </div>

      {/* Security Disclaimer Box (Prompt Requirement) */}
      <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 text-center space-y-1 no-print">
        <p className="font-semibold text-slate-800">
          Information de conformité et de sécurité
        </p>
        <p>
          Les informations ci-dessus sont destinées exclusivement à l'exécution d'un virement bancaire au profit du compte vérifié de l'organisme. Aucun prélèvement direct ni paiement par carte n'est requis sur cette page.
        </p>
      </div>
    </div>
  );
}
