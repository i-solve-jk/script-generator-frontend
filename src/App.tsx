import { Film } from "lucide-react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { PromptProcessingPage } from "./components/organisms/PromptProcessingPage";

function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50/40">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 border-b border-gray-200/60 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 shadow-sm">
            <Film size={17} className="text-white" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold tracking-tight text-gray-900 sm:text-base">
              AI Video Studio
            </h1>
            <nav aria-label="Workflow steps">
              <ol className="flex items-center gap-1 text-[10px] text-gray-400 sm:text-[11px]">
                <li className="font-medium text-indigo-600">Prompt</li>
                <li aria-hidden="true">&rarr;</li>
                <li>Extract</li>
                <li aria-hidden="true">&rarr;</li>
                <li>Enhance</li>
                <li aria-hidden="true">&rarr;</li>
                <li>Script</li>
                <li aria-hidden="true">&rarr;</li>
                <li>Video</li>
              </ol>
            </nav>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-5 sm:px-6 sm:py-8">
        <ErrorBoundary>
          <PromptProcessingPage />
        </ErrorBoundary>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-gray-100 py-4 text-center text-[11px] text-gray-400 sm:text-xs">
        Powered by{" "}
        <span className="font-medium text-gray-500">Groq</span> +{" "}
        <span className="font-medium text-gray-500">Replicate</span>
        {" "}&middot;{" "}Built with React + FastAPI
      </footer>
    </div>
  );
}

export default App;
