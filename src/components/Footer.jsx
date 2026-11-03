import { Shield, Building, Clock, FileCheck } from 'lucide-react';
import { organizationConfig } from '../config/organization';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 mt-auto border-t border-slate-800 no-print">
      {/* Top Footer Banner */}
      <div className="bg-slate-950/70 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">
                Règlement Sécurisé par Virement Bancaire SEPA
              </p>
              <p className="text-slate-400">
                Aucune coordonnée de carte bancaire, mot de passe ou code confidentiel n’est collecté.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Coordonnées bancaires IBAN vérifiées & agréées</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Col 1: Organisation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-400" />
              {organizationConfig.legalName}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {organizationConfig.entityType}
              <br />
              SIRET : {organizationConfig.siret} • N° TVA : {organizationConfig.tvaIntracommunautaire}
            </p>
            <p className="text-xs text-slate-400">
              {organizationConfig.contact.addressLine1}, {organizationConfig.contact.addressLine2}
              <br />
              {organizationConfig.contact.postalCode} {organizationConfig.contact.city}, {organizationConfig.contact.country}
            </p>
            <p className="text-xs text-slate-400">
              Responsable désigné : <span className="text-slate-300 font-medium">{organizationConfig.designatedRepresentative.fullName}</span>
            </p>
          </div>

          {/* Col 2: Virement & Délais */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">
              Modalités de Traitement
            </h4>
            <ul className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>
                  <strong>Délai bancaire :</strong> Un virement bancaire SEPA est généralement crédité sous {organizationConfig.bankDetails.settlementDelay}.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>
                  <strong>Affectation du dossier :</strong> L'indication exacte de la référence de votre dossier est requise pour l'affectation du règlement.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>
                  <strong>Justificatif :</strong> Conservez l'avis d'exécution délivré par votre banque pour toute vérification comptable.
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Horaires & Mentions de Service */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">
              Permanence du Service
            </h4>
            <div className="text-xs text-slate-400 space-y-2">
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Horaires : {organizationConfig.contact.supportHours}</span>
              </p>
              <p className="leading-relaxed">
                Traitement automatisé des ordres de virement SEPA transmis au service de recouvrement.
              </p>
            </div>
            <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800">
              Conformité RGPD : Les informations transmises servent exclusivement au suivi comptable du règlement de votre dossier.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-slate-950 py-4 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <p>
          © {CURRENT_YEAR} {organizationConfig.legalName}. Tous droits réservés.
        </p>
        <p className="text-[11px] text-slate-600 mt-1">
          {organizationConfig.disclaimers.invoiceDisclaimer}
        </p>
      </div>
    </footer>
  );
}
