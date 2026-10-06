import { Check } from "lucide-react";
import type { Course } from "@/lib/courses";

type QuizQuestionProps = {
  question: Course["quiz"][number];
  questionIndex: number;
  selectedAnswer?: number;
  onSelect: (optionIndex: number) => void;
};

export function QuizQuestion({
  question,
  questionIndex,
  selectedAnswer,
  onSelect,
}: QuizQuestionProps) {
  return (
    <>
      <h3 className="text-[17px] font-semibold leading-6 text-[#263a30]">
        {question.prompt}
      </h3>

      <div className="mt-4 space-y-2.5">
        {question.options.map((option, optionIndex) => {
          const selected = selectedAnswer === optionIndex;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(optionIndex)}
              aria-pressed={selected}
              className={`flex min-h-11 w-full items-center gap-3 rounded-sm border px-3 py-2.5 text-left text-sm leading-5 transition ${
                selected
                  ? "border-[#448660] bg-[#edf5ee] text-[#244c37]"
                  : "border-[#e3e9e2] bg-white text-[#5d6c63] hover:border-[#9fbaa5] hover:bg-[#f8faf7]"
              }`}
            >
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-full border text-[10px] font-semibold ${
                  selected
                    ? "border-[#327455] bg-[#327455] text-white"
                    : "border-[#cbd5cd] text-[#77867c]"
                }`}
              >
                {selected ? (
                  <Check className="size-3" aria-hidden="true" />
                ) : (
                  String.fromCharCode(65 + optionIndex)
                )}
              </span>

              <span>{option}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
