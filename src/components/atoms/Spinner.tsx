import { memo } from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-8 w-8 border-[3px]",
} as const;

export const Spinner = memo(function Spinner({
  size = "sm",
  className = "",
}: SpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full border-current border-t-transparent ${SIZE_MAP[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
});
