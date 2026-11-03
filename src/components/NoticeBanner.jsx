import { AlertTriangle, Info, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function NoticeBanner({ type = 'info', title, children, className = '' }) {
  const configs = {
    info: {
      bg: 'bg-blue-50/80 border-blue-200 text-blue-900',
      icon: <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />,
      titleColor: 'text-blue-950',
    },
    warning: {
      bg: 'bg-amber-50/90 border-amber-300 text-amber-950',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />,
      titleColor: 'text-amber-950 font-bold',
    },
    security: {
      bg: 'bg-slate-900 text-slate-100 border-slate-800 shadow-sm',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />,
      titleColor: 'text-white font-semibold',
    },
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />,
      titleColor: 'text-emerald-950 font-semibold',
    },
  };

  const current = configs[type] || configs.info;

  return (
    <div
      role="region"
      aria-label={title || 'Notice'}
      className={`flex items-start gap-3 p-4 rounded-xl border text-sm leading-relaxed ${current.bg} ${className}`}
    >
      {current.icon}
      <div className="flex-1 space-y-1">
        {title && <h3 className={`text-sm ${current.titleColor}`}>{title}</h3>}
        <div className="text-xs sm:text-sm">{children}</div>
      </div>
    </div>
  );
}

