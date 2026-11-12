/**
 * Organization Logo Component
 * Clean, official administrative heraldic shield mark in white & institutional blue
 */
export default function OrganizationLogo({ className = "h-10 w-auto", compact = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#002a40] text-white shadow-xs border border-blue-900 flex-shrink-0">
        <svg
          className="w-5 h-5 text-blue-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" title="Service vérifié" />
      </div>
      {!compact && (
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Portail Officiel
          </span>
          <span className="text-sm font-bold tracking-tight text-[#002a40] leading-tight">
            Service Recouvrement
          </span>
          <span className="text-[11px] font-medium text-slate-500">
            Règlement par virement bancaire SEPA
          </span>
        </div>
      )}
    </div>
  );
}
