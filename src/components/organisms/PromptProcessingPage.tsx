import { useCallback, useRef } from "react";
import { useAppStore } from "../../store/useAppStore";
import {
  extractOptions,
  enhancePrompt,
  generateScript,
  generateVideo,
} from "../../services/api";
import { ErrorBanner } from "../molecules/ErrorBanner";
import { PromptSection } from "../molecules/PromptSection";
import { OptionsGrid } from "../molecules/OptionsGrid";
import { ScriptOutput } from "../molecules/ScriptOutput";
import { VideoPlayer } from "../molecules/VideoPlayer";

export function PromptProcessingPage() {
  const {
    prompt,
    setPrompt,
    options,
    setOptions,
    updateOption,
    optionsExtracted,
    setOptionsExtracted,
    script,
    setScript,
    videoUrl,
    setVideoUrl,
    videoProvider,
    setVideoProvider,
    extracting,
    setExtracting,
    enhancing,
    setEnhancing,
    generating,
    setGenerating,
    generatingVideo,
    setGeneratingVideo,
    error,
    setError,
    reset,
  } = useAppStore();

  const optionsRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const isAnyLoading = extracting || enhancing || generating || generatingVideo;

  const scrollTo = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }, []);

  const handleDismissError = useCallback(() => setError(null), [setError]);

  const handleExtract = useCallback(async () => {
    if (!prompt.trim()) return;
    setExtracting(true);
    setError(null);
    try {
      const result = await extractOptions(prompt.trim());
      setOptions(result.options);
      setOptionsExtracted(true);
      scrollTo(optionsRef);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to extract options");
    } finally {
      setExtracting(false);
    }
  }, [prompt, setExtracting, setError, setOptions, setOptionsExtracted, scrollTo]);

  const handleEnhance = useCallback(async () => {
    if (!prompt.trim()) return;
    setEnhancing(true);
    setError(null);
    try {
      const result = await enhancePrompt(prompt.trim(), options);
      setPrompt(result.enhanced_prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to enhance prompt");
    } finally {
      setEnhancing(false);
    }
  }, [prompt, options, setEnhancing, setError, setPrompt]);

  const handleGenerateScript = useCallback(async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setError(null);
    try {
      const result = await generateScript(prompt.trim(), options);
      setScript(result.script);
      scrollTo(scriptRef);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate script");
    } finally {
      setGenerating(false);
    }
  }, [prompt, options, setGenerating, setError, setScript, scrollTo]);

  const handleGenerateVideo = useCallback(async () => {
    if (!prompt.trim()) return;
    setGeneratingVideo(true);
    setError(null);
    try {
      const result = await generateVideo(prompt.trim(), options, videoProvider);
      setVideoUrl(result.video_url);
      scrollTo(videoRef);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate video");
    } finally {
      setGeneratingVideo(false);
    }
  }, [prompt, options, videoProvider, setGeneratingVideo, setError, setVideoUrl, scrollTo]);

  return (
    <div className="space-y-5 pb-6 sm:space-y-6">
      {error && (
        <ErrorBanner message={error} onDismiss={handleDismissError} />
      )}

      <PromptSection
        prompt={prompt}
        onPromptChange={setPrompt}
        onExtract={handleExtract}
        onEnhance={handleEnhance}
        onGenerateScript={handleGenerateScript}
        onGenerateVideo={handleGenerateVideo}
        extracting={extracting}
        enhancing={enhancing}
        generating={generating}
        generatingVideo={generatingVideo}
        disabled={isAnyLoading}
        videoProvider={videoProvider}
        onProviderChange={setVideoProvider}
      />

      {optionsExtracted && (
        <div ref={optionsRef}>
          <OptionsGrid
            options={options}
            onUpdate={updateOption}
            disabled={isAnyLoading}
          />
        </div>
      )}

      {script && (
        <div ref={scriptRef}>
          <ScriptOutput script={script} onReset={reset} />
        </div>
      )}

      <div ref={videoRef}>
        <VideoPlayer
          videoUrl={videoUrl}
          isGenerating={generatingVideo}
          onReset={reset}
        />
      </div>
    </div>
  );
}
