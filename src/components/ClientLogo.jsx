import clientLogoImg from '../assets/logo-website.png';

/**
 * Client's Official Logo Component
 * Positioned on the LEFT side of all steps with enhanced visibility
 */
export default function ClientLogo({ className = 'h-14 sm:h-20 md:h-22 w-auto' }) {
  return (
    <div className="flex items-center">
      <img
        src={clientLogoImg}
        alt="Logo Officiel de l'Organisme"
        className={`object-contain max-w-[320px] sm:max-w-[460px] md:max-w-[560px] drop-shadow-2xs transition-all ${className}`}
      />
    </div>
  );
}
