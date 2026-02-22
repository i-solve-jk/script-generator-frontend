import { memo } from "react";
import { Video, RotateCcw, Download } from "lucide-react";
import { Spinner } from "../atoms/Spinner";

interface VideoPlayerProps {
  videoUrl: string;
  isGenerating: boolean;
  onReset: () => void;
}

export const VideoPlayer = memo(function VideoPlayer({
  videoUrl,
  isGenerating,
  onReset,
}: VideoPlayerProps) {
  if (isGenerating) {
    return (
      <section className="animate-slide-up scroll-mt-20 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-md shadow-gray-200/50">
        <div className="flex flex-col items-center gap-4 px-4 py-16 sm:py-20">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-rose-200 opacity-40" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
              <Spinner size="lg" className="text-rose-600" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900">
              Generating video with AI...
            </p>
            <p className="mt-1 text-xs text-gray-500">
              This usually takes 2–4 minutes. Please wait.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!videoUrl) return null;

  return (
    <section
      aria-labelledby="video-heading"
      className="animate-slide-up scroll-mt-20 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-md shadow-gray-200/50"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-gray-100 bg-linear-to-r from-rose-50/40 to-pink-50/20 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 sm:h-8 sm:w-8">
          <Video size={14} className="text-rose-600" aria-hidden="true" />
        </div>
        <div>
          <h2
            id="video-heading"
            className="text-sm font-semibold text-gray-900 sm:text-base"
          >
            Generated Video
          </h2>
          <p className="hidden text-xs text-gray-500 sm:block">
            AI-generated video from your prompt via Replicate
          </p>
        </div>
      </div>

      {/* Video */}
      <div className="bg-gray-950 p-3 sm:p-6">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl">
          <video
            src={videoUrl}
            controls
            className="w-full"
            preload="metadata"
          >
            <track kind="captions" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 bg-gray-50/40 px-4 py-3 sm:px-6">
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-rose-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          <Download size={15} aria-hidden="true" />
          Download Video
        </a>
        <button
          onClick={onReset}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
          aria-label="Start over"
        >
          <RotateCcw size={15} aria-hidden="true" />
          Reset
        </button>
      </div>
    </section>
  );
});
