import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  icon?: ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-indigo-600 disabled:bg-indigo-400",
  secondary:
    "bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-400 disabled:bg-gray-100 disabled:text-gray-400",
  ghost:
    "bg-transparent text-gray-600 hover:bg-gray-100 focus-visible:outline-gray-400 disabled:text-gray-300",
};

export function Button({
  children,
  variant = "primary",
  loading = false,
  icon,
  disabled,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {loading && <Spinner size="sm" />}
      {!loading && icon}
      {children}
    </button>
  );
}
