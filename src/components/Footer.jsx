import { Clock } from 'lucide-react';
import { organizationConfig } from '../config/organization';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full bg-[#002a40] text-blue-100 mt-auto border-t border-blue-900 no-print">

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Col 1: Organisation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white flex items-center gap-2">
              {organizationConfig.legalName}
            </h4>
            <p className="text-xs text-blue-200/90 leading-relaxed">
              {organizationConfig.entityType}
              <br />
              SIRET : {organizationConfig.siret} • N° TVA : {organizationConfig.tvaIntracommunautaire}
            </p>
            <p className="text-xs text-blue-200/80">
              {organizationConfig.contact.addressLine1}, {organizationConfig.contact.addressLine2}
              <br />
              {organizationConfig.contact.postalCode} {organizationConfig.contact.city}, {organizationConfig.contact.country}
            </p>
            <p className="text-xs text-blue-200/90">
              Responsable désigné : <span className="text-white font-medium">{organizationConfig.designatedRepresentative.fullName}</span>
            </p>
          </div>

          {/* Col 2: Virement & Délais */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white">
              Modalités de Traitement
            </h4>
            <ul className="text-xs text-blue-200/90 space-y-2 leading-relaxed">
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
            <div className="text-xs text-blue-200/90 space-y-2">
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-300 flex-shrink-0" />
                <span>Horaires : {organizationConfig.contact.supportHours}</span>
              </p>
              <p className="leading-relaxed text-blue-200/80">
                Traitement automatisé des ordres de virement SEPA transmis au service de recouvrement.
              </p>
            </div>
            <div className="pt-2 text-[11px] text-blue-300/70 border-t border-blue-900/60">
              Conformité RGPD : Les informations transmises servent exclusivement au suivi comptable du règlement de votre dossier.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-[#001c2c] py-4 px-4 sm:px-6 lg:px-8 border-t border-blue-900/80 text-center text-xs text-blue-300/70">
        <p>
          © {CURRENT_YEAR} {organizationConfig.legalName}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
