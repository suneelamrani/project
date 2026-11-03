import { AlertCircle } from 'lucide-react';

export default function FormInput({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  placeholder = '',
  required = false,
  readOnly = false,
  helperText = '',
  icon: Icon,
  className = '',
  inputClassName = '',
  badge = null,
}) {
  const inputId = id || name;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={`space-y-1.5 text-left ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-800"
        >
          {label}
          {required && <span className="text-rose-500 ml-1 font-bold" title="Champ obligatoire">*</span>}
        </label>
        {badge && (
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            {badge}
          </span>
        )}
      </div>

      <div className="relative rounded-lg shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          id={inputId}
          name={name || inputId}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          readOnly={readOnly}
          aria-invalid={Boolean(error)}
          aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`.trim() || undefined}
          className={`block w-full rounded-lg text-sm transition-colors py-2.5 ${
            Icon ? 'pl-10' : 'pl-3.5'
          } pr-3.5 ${
            readOnly
              ? 'bg-slate-100 text-slate-600 border-slate-200 cursor-not-allowed'
              : error
              ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none'
              : 'border-slate-300 bg-white text-slate-900 hover:border-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100 focus:outline-none'
          } border ${inputClassName}`}
        />
      </div>

      {helperText && !error && (
        <p id={helperId} className="text-xs text-slate-500">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs font-medium text-rose-600 mt-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

