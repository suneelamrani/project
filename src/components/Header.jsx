import { Shield, Lock, PhoneCall } from 'lucide-react';
import OrganizationLogo from './OrganizationLogo';
import { organizationConfig } from '../config/organization';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Org Name */}
          <div className="flex items-center">
            <OrganizationLogo />
          </div>

          {/* Right badges & Support */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Security Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Protocole Sécurisé</span>
            </div>

            {/* Assistance Contact Link */}
            <a
              href={`tel:${organizationConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-blue-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200"
              title="Centre d'assistance"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>Assistance : {organizationConfig.contact.phone}</span>
            </a>

            {/* Language Tag */}
            <div className="flex items-center text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              FR
            </div>
          </div>
        </div>
      </div>

      {/* Verification Notice Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium border-t border-slate-800 flex items-center justify-center gap-2">
        <Shield className="w-3.5 h-3.5 text-blue-400" />
        <span>
          Portail officiel de transmission des coordonnées de virement SEPA.
        </span>
      </div>
    </header>
  );
}

