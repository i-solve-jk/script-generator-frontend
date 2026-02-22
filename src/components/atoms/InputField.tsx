import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
}

export function InputField({
  label,
  helperText,
  id,
  className = "",
  ...rest
}: InputFieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-colors ${className}`}
        {...rest}
      />
      {helperText && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
