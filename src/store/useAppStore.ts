import { create } from "zustand";
import type { ExtractedOptions, VideoProvider } from "../types";

interface AppState {
  prompt: string;
  options: ExtractedOptions;
  optionsExtracted: boolean;
  script: string;
  videoUrl: string;
  videoProvider: VideoProvider;

  extracting: boolean;
  enhancing: boolean;
  generating: boolean;
  generatingVideo: boolean;
  error: string | null;

  setPrompt: (prompt: string) => void;
  setOptions: (options: ExtractedOptions) => void;
  updateOption: (key: keyof ExtractedOptions, value: string) => void;
  setOptionsExtracted: (extracted: boolean) => void;
  setScript: (script: string) => void;
  setVideoUrl: (url: string) => void;
  setVideoProvider: (provider: VideoProvider) => void;
  setExtracting: (loading: boolean) => void;
  setEnhancing: (loading: boolean) => void;
  setGenerating: (loading: boolean) => void;
  setGeneratingVideo: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialOptions: ExtractedOptions = {
  duration: "",
  language: "",
  platform: "",
  size: "",
  category: "",
};

export const useAppStore = create<AppState>((set) => ({
  prompt: "",
  options: { ...initialOptions },
  optionsExtracted: false,
  script: "",
  videoUrl: "",
  videoProvider: "leonardo" as VideoProvider,

  extracting: false,
  enhancing: false,
  generating: false,
  generatingVideo: false,
  error: null,

  setPrompt: (prompt) => set({ prompt }),
  setOptions: (options) => set({ options }),
  updateOption: (key, value) =>
    set((state) => ({
      options: { ...state.options, [key]: value },
    })),
  setOptionsExtracted: (optionsExtracted) => set({ optionsExtracted }),
  setScript: (script) => set({ script }),
  setVideoUrl: (videoUrl) => set({ videoUrl }),
  setVideoProvider: (videoProvider) => set({ videoProvider }),
  setExtracting: (extracting) => set({ extracting }),
  setEnhancing: (enhancing) => set({ enhancing }),
  setGenerating: (generating) => set({ generating }),
  setGeneratingVideo: (generatingVideo) => set({ generatingVideo }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      prompt: "",
      options: { ...initialOptions },
      optionsExtracted: false,
      script: "",
      videoUrl: "",
      videoProvider: "leonardo" as VideoProvider,
      extracting: false,
      enhancing: false,
      generating: false,
      generatingVideo: false,
      error: null,
    }),
}));
