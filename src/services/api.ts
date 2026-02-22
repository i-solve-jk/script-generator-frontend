import type {
  ExtractedOptions,
  ExtractResponse,
  EnhanceResponse,
  ScriptResponse,
  VideoResponse,
  VideoProvider,
} from "../types";

const API_BASE = "/api";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(
  url: string,
  body: unknown,
  signal?: AbortSignal,
): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new ApiError(
      error.detail || `Request failed: ${res.status}`,
      res.status,
    );
  }

  return res.json();
}

export function extractOptions(
  prompt: string,
  signal?: AbortSignal,
): Promise<ExtractResponse> {
  return request<ExtractResponse>("/extract-options", { prompt }, signal);
}

export function enhancePrompt(
  prompt: string,
  options: ExtractedOptions,
  signal?: AbortSignal,
): Promise<EnhanceResponse> {
  return request<EnhanceResponse>(
    "/enhance-prompt",
    { prompt, options },
    signal,
  );
}

export function generateScript(
  prompt: string,
  options: ExtractedOptions,
  signal?: AbortSignal,
): Promise<ScriptResponse> {
  return request<ScriptResponse>(
    "/generate-script",
    { prompt, options },
    signal,
  );
}

export function generateVideo(
  prompt: string,
  options: ExtractedOptions,
  provider: VideoProvider,
  signal?: AbortSignal,
): Promise<VideoResponse> {
  return request<VideoResponse>(
    "/generate-video",
    { prompt, options, provider },
    signal,
  );
}

export async function healthCheck(): Promise<{
  status: string;
  groq_configured: boolean;
  replicate_configured: boolean;
}> {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export { ApiError };
