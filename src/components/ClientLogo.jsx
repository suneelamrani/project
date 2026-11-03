import clientLogoImg from '../assets/logo-website.png';

/**
 * Client's Official Logo Component
 * Rendered with a pure white background for optimal contrast and clarity
 */
export default function ClientLogo({ className = 'h-14 sm:h-20 w-auto', containerClassName = '' }) {
  return (
    <div className={`inline-flex items-center justify-center bg-white p-2 sm:p-3 rounded-xl border border-slate-200/80 shadow-xs ${containerClassName}`}>
      <img
        src={clientLogoImg}
        alt="Logo Officiel de l'Organisme"
        className={`object-contain max-w-[320px] sm:max-w-[460px] md:max-w-[540px] ${className}`}
      />
    </div>
  );
}
