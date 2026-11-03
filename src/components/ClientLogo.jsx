import clientLogoImg from '../assets/logo-website.png';

/**
 * Client's Official Logo Component
 * Positioned on the LEFT side of all steps
 */
export default function ClientLogo({ className = 'h-10 sm:h-12 w-auto' }) {
  return (
    <div className="flex items-center">
      <img
        src={clientLogoImg}
        alt="Logo Officiel de l'Organisme"
        className={`object-contain max-w-[220px] sm:max-w-[280px] ${className}`}
      />
    </div>
  );
}

