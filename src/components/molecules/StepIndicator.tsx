import { Check } from "lucide-react";
import type { WorkflowStep } from "../../types";

interface Step {
  key: WorkflowStep;
  label: string;
  number: number;
}

const steps: Step[] = [
  { key: "prompt", label: "Enter Prompt", number: 1 },
  { key: "options", label: "Review Options", number: 2 },
  { key: "enhance", label: "Enhance Prompt", number: 3 },
  { key: "script", label: "View Script", number: 4 },
];

const stepOrder: WorkflowStep[] = ["prompt", "options", "enhance", "script"];

interface StepIndicatorProps {
  currentStep: WorkflowStep;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <nav aria-label="Workflow progress" className="w-full">
      <ol className="flex items-center gap-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li
              key={step.key}
              className="flex items-center gap-2 flex-1"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check size={14} aria-hidden="true" />
                  ) : (
                    step.number
                  )}
                </span>
                <span
                  className={`text-xs font-medium truncate hidden sm:block ${
                    isCurrent
                      ? "text-indigo-600"
                      : isCompleted
                        ? "text-emerald-600"
                        : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 rounded-full transition-colors ${
                    index < currentIndex ? "bg-emerald-400" : "bg-gray-200"
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
