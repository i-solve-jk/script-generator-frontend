import { memo } from "react";

interface SelectFieldProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  id: string;
  disabled?: boolean;
}

export const SelectField = memo(function SelectField({
  label,
  value,
  options,
  onChange,
  id,
  disabled = false,
}: SelectFieldProps) {
  const hasValue = value.length > 0;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wide text-gray-500"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`min-h-[44px] w-full cursor-pointer appearance-none rounded-xl border bg-size-[16px_16px] bg-position-[right_12px_center] bg-no-repeat px-3.5 py-2.5 pr-10 text-sm shadow-sm transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
          hasValue
            ? "border-gray-200 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500/20"
            : "border-amber-200 bg-amber-50/30 text-gray-500 focus:border-amber-400 focus:ring-amber-400/20"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236b7280'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'/%3E%3C/svg%3E")`,
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt || `Select ${label.toLowerCase()}...`}
          </option>
        ))}
      </select>
      {!hasValue && (
        <p className="text-[11px] font-medium text-amber-600/80" role="status">
          Not detected — select manually
        </p>
      )}
    </div>
  );
});
