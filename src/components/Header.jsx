import { Lock } from 'lucide-react';
import ClientLogo from './ClientLogo';
import OrganizationLogo from './OrganizationLogo';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[90px] sm:min-h-[105px] py-3 gap-4">
          {/* LEFT SIDE: Client's Official Logo on pure white */}
          <div className="flex items-center flex-shrink-0">
            <ClientLogo className="h-12 sm:h-18 md:h-20 w-auto" />
          </div>

          {/* RIGHT SIDE: Security Badge & Official Stamp */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-blue-700" />
              <span>Connexion Sécurisée TLS</span>
            </div>

            {/* Shield Mark on the right side */}
            <OrganizationLogo compact={false} className="hidden sm:flex" />
            <OrganizationLogo compact={true} className="flex sm:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}
