/**
 * Organization Logo Component
 * Clean, modern administrative heraldic & financial shield mark
 */
export default function OrganizationLogo({ className = "h-10 w-auto", compact = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white shadow-md shadow-blue-950/20 border border-slate-700/30 flex-shrink-0">
        <svg
          className="w-6 h-6 text-blue-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" title="Service vérifié" />
      </div>
      {!compact && (
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Portail Officiel
          </span>
          <span className="text-base font-bold tracking-tight text-slate-900 leading-tight">
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

