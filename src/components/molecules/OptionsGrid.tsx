import { memo } from "react";
import { Settings2 } from "lucide-react";
import { SelectField } from "../atoms/SelectField";
import {
  DURATION_OPTIONS,
  LANGUAGE_OPTIONS,
  PLATFORM_OPTIONS,
  SIZE_OPTIONS,
  CATEGORY_OPTIONS,
} from "../../config/options";
import type { ExtractedOptions } from "../../types";

interface OptionsGridProps {
  options: ExtractedOptions;
  onUpdate: (key: keyof ExtractedOptions, value: string) => void;
  disabled?: boolean;
}

export const OptionsGrid = memo(function OptionsGrid({
  options,
  onUpdate,
  disabled = false,
}: OptionsGridProps) {
  const filledCount = Object.values(options).filter((v) => v.length > 0).length;

  return (
    <section
      aria-labelledby="options-heading"
      className="animate-slide-up scroll-mt-20 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-md shadow-gray-200/50"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-linear-to-r from-amber-50/40 to-orange-50/20 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 sm:h-8 sm:w-8">
            <Settings2
              size={14}
              className="text-amber-600"
              aria-hidden="true"
            />
          </div>
          <div>
            <h2
              id="options-heading"
              className="text-sm font-semibold text-gray-900 sm:text-base"
            >
              Extracted Options
            </h2>
            <p className="hidden text-xs text-gray-500 sm:block">
              Review and edit. Fill in any missing fields.
            </p>
          </div>
        </div>
        <span
          className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-bold tabular-nums ${
            filledCount === 5
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {filledCount}/5
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
        <SelectField
          id="opt-duration"
          label="Duration"
          value={options.duration}
          options={DURATION_OPTIONS}
          onChange={(v) => onUpdate("duration", v)}
          disabled={disabled}
        />
        <SelectField
          id="opt-language"
          label="Language"
          value={options.language}
          options={LANGUAGE_OPTIONS}
          onChange={(v) => onUpdate("language", v)}
          disabled={disabled}
        />
        <SelectField
          id="opt-platform"
          label="Platform"
          value={options.platform}
          options={PLATFORM_OPTIONS}
          onChange={(v) => onUpdate("platform", v)}
          disabled={disabled}
        />
        <SelectField
          id="opt-size"
          label="Size / Aspect"
          value={options.size}
          options={SIZE_OPTIONS}
          onChange={(v) => onUpdate("size", v)}
          disabled={disabled}
        />
        <SelectField
          id="opt-category"
          label="Category"
          value={options.category}
          options={CATEGORY_OPTIONS}
          onChange={(v) => onUpdate("category", v)}
          disabled={disabled}
        />
      </div>
    </section>
  );
});
