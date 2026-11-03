import { Shield, Lock } from 'lucide-react';
import ClientLogo from './ClientLogo';
import OrganizationLogo from './OrganizationLogo';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22 gap-4">
          {/* LEFT SIDE: Client's Official Logo */}
          <div className="flex items-center flex-shrink-0">
            <ClientLogo className="h-10 sm:h-12 w-auto" />
          </div>

          {/* RIGHT SIDE: Generated Security Shield Logo & Security Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Protocole Sécurisé</span>
            </div>

            {/* Our Shield Mark on the right side */}
            <OrganizationLogo compact={false} className="hidden sm:flex" />
            <OrganizationLogo compact={true} className="flex sm:hidden" />
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
