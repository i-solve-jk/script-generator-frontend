import { memo } from "react";
import { Search, Sparkles, Clapperboard, Video } from "lucide-react";
import { Spinner } from "../atoms/Spinner";
import type { VideoProvider } from "../../types";

interface PromptSectionProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onExtract: () => void;
  onEnhance: () => void;
  onGenerateScript: () => void;
  onGenerateVideo: () => void;
  extracting: boolean;
  enhancing: boolean;
  generating: boolean;
  generatingVideo: boolean;
  disabled: boolean;
  videoProvider: VideoProvider;
  onProviderChange: (provider: VideoProvider) => void;
}

export const PromptSection = memo(function PromptSection({
  prompt,
  onPromptChange,
  onExtract,
  onEnhance,
  onGenerateScript,
  onGenerateVideo,
  extracting,
  enhancing,
  generating,
  generatingVideo,
  disabled,
  videoProvider,
  onProviderChange,
}: PromptSectionProps) {
  const isEmpty = !prompt.trim();
  const isAnyLoading = extracting || enhancing || generating || generatingVideo;
  const isDisabled = isEmpty || isAnyLoading;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onExtract();
    }
  };

  return (
    <section
      aria-labelledby="prompt-heading"
      className="animate-fade-in overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-md shadow-gray-200/50"
    >
      {/* Header */}
      <div className="border-b border-gray-100 bg-linear-to-r from-indigo-50/50 to-violet-50/30 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 sm:h-8 sm:w-8">
            <Sparkles size={14} className="text-indigo-600" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="prompt-heading"
              className="text-sm font-semibold text-gray-900 sm:text-base"
            >
              Describe Your Video
            </h2>
            <p className="hidden text-xs text-gray-500 sm:block">
              Include duration, language, platform, size, and category for best
              results
            </p>
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="p-4 sm:p-6">
        <label htmlFor="video-prompt" className="sr-only">
          Video prompt
        </label>
        <textarea
          id="video-prompt"
          rows={4}
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="e.g. Create a 30 second kids educational video about cleanliness for YouTube in English, vertical format."
          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm leading-relaxed text-gray-900 shadow-inner placeholder:text-gray-400 transition-all focus:border-indigo-400 focus:bg-white focus:shadow-none focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500 sm:text-base sm:leading-relaxed"
          aria-describedby="prompt-hint"
        />
        <p
          id="prompt-hint"
          className="mt-2 text-[11px] text-gray-400 sm:text-xs"
        >
          <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">
            Ctrl+Enter
          </kbd>{" "}
          to extract options
        </p>
      </div>

      {/* Provider Selector + Action Buttons */}
      <div className="space-y-3 border-t border-gray-100 bg-gray-50/40 px-4 py-3 sm:px-6 sm:py-4">
        {/* Provider Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Video Provider
          </span>
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5 shadow-sm" role="radiogroup" aria-label="Select video provider">
            <button
              type="button"
              role="radio"
              aria-checked={videoProvider === "leonardo"}
              onClick={() => onProviderChange("leonardo")}
              disabled={isAnyLoading}
              className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-semibold transition-all sm:text-sm ${
                videoProvider === "leonardo"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              Leonardo
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={videoProvider === "replicate"}
              onClick={() => onProviderChange("replicate")}
              disabled={isAnyLoading}
              className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-semibold transition-all sm:text-sm ${
                videoProvider === "replicate"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              Replicate
            </button>
          </div>
          <span className="hidden text-[11px] text-gray-400 sm:inline">
            {videoProvider === "leonardo" ? "720p, smooth interpolation" : "Minimax video-01, ~6s clips"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
        <button
          onClick={onExtract}
          disabled={isDisabled}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
        >
          {extracting ? (
            <Spinner size="sm" className="text-white" />
          ) : (
            <Search size={15} aria-hidden="true" />
          )}
          Extract Options
        </button>

        <button
          onClick={onEnhance}
          disabled={isDisabled}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
        >
          {enhancing ? (
            <Spinner size="sm" className="text-white" />
          ) : (
            <Sparkles size={15} aria-hidden="true" />
          )}
          Enhance Prompt
        </button>

        <button
          onClick={onGenerateScript}
          disabled={isDisabled}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-violet-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
        >
          {generating ? (
            <Spinner size="sm" className="text-white" />
          ) : (
            <Clapperboard size={15} aria-hidden="true" />
          )}
          Generate Script
        </button>

        <button
          onClick={onGenerateVideo}
          disabled={isDisabled}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-rose-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
        >
          {generatingVideo ? (
            <Spinner size="sm" className="text-white" />
          ) : (
            <Video size={15} aria-hidden="true" />
          )}
          Generate Video
        </button>
        </div>
      </div>
    </section>
  );
});
