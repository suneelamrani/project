import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useFormContext } from '../context/FormContext';

export default function CopyButton({ text, label = 'Copier', fieldName = '', className = '' }) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useFormContext();

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-https or older browser environments
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      showToast(`${fieldName ? fieldName + ' ' : ''}copié dans le presse-papier !`);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Erreur de copie:', err);
      showToast('Impossible de copier automatiquement');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer no-print ${
        copied
          ? 'bg-emerald-600 text-white shadow-sm ring-emerald-500'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300 ring-slate-400'
      } ${className}`}
      aria-label={`Copier ${fieldName || text}`}
      title={`Copier ${fieldName || text}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-white" />
          <span>Copié !</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-slate-500" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

