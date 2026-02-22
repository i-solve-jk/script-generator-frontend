import { memo, useState } from "react";
import { FileText, Copy, Check, RotateCcw } from "lucide-react";

interface ScriptOutputProps {
  script: string;
  onReset: () => void;
}

export const ScriptOutput = memo(function ScriptOutput({
  script,
  onReset,
}: ScriptOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <section
      aria-labelledby="script-heading"
      className="animate-slide-up scroll-mt-20 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-md shadow-gray-200/50"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-gray-100 bg-linear-to-r from-violet-50/40 to-purple-50/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 sm:h-8 sm:w-8">
            <FileText
              size={14}
              className="text-violet-600"
              aria-hidden="true"
            />
          </div>
          <div>
            <h2
              id="script-heading"
              className="text-sm font-semibold text-gray-900 sm:text-base"
            >
              Cinematic Video Script
            </h2>
            <p className="hidden text-xs text-gray-500 sm:block">
              Production-ready, scene-by-scene script
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
          >
            {copied ? (
              <Check size={15} className="text-emerald-600" aria-hidden="true" />
            ) : (
              <Copy size={15} aria-hidden="true" />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={onReset}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
            aria-label="Start over"
          >
            <RotateCcw size={15} aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>

      {/* Script Content */}
      <div className="p-4 sm:p-6">
        <div className="max-h-[55vh] overflow-y-auto overscroll-contain rounded-xl border border-gray-100 bg-gray-50/50 p-4 sm:p-5">
          <div className="whitespace-pre-wrap text-sm leading-7 text-gray-800 sm:text-[15px]">
            {script}
          </div>
        </div>
      </div>
    </section>
  );
});
