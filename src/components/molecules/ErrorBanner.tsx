import { memo } from "react";
import { AlertCircle, X } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorBanner = memo(function ErrorBanner({
  message,
  onDismiss,
}: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="animate-fade-in flex items-start gap-3 rounded-2xl border border-red-200/60 bg-red-50 p-3.5 shadow-sm sm:p-4"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
        <AlertCircle size={16} className="text-red-600" aria-hidden="true" />
      </div>
      <p className="flex-1 pt-1 text-sm leading-relaxed text-red-700">
        {message}
      </p>
      <button
        onClick={onDismiss}
        className="shrink-0 rounded-lg p-1.5 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        aria-label="Dismiss error"
      >
        <X size={16} />
      </button>
    </div>
  );
});
