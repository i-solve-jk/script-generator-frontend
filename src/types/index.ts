export interface ExtractedOptions {
  duration: string;
  language: string;
  platform: string;
  size: string;
  category: string;
}

export interface ExtractResponse {
  options: ExtractedOptions;
  original_prompt: string;
}

export interface EnhanceResponse {
  enhanced_prompt: string;
}

export interface ScriptResponse {
  script: string;
}

export type VideoProvider = "leonardo" | "replicate";

export interface VideoResponse {
  video_url: string;
  status: string;
  provider: string;
}
