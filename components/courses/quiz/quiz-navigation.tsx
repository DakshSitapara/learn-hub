import { Check, ChevronLeft, ChevronRight } from "lucide-react";

type QuizNavigationProps = {
  questionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
};

export function QuizNavigation({
  questionIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onFinish,
}: QuizNavigationProps) {
  const isFirstQuestion = questionIndex === 0;
  const isLastQuestion = questionIndex === totalQuestions - 1;

  return (
    <div className="mt-6 flex items-center justify-between border-t border-[#edf0eb] pt-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="inline-flex h-10 items-center gap-1 rounded-sm px-2 text-sm font-medium text-[#5b6d62] transition hover:bg-[#f4f6f2] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Previous
      </button>

      {isLastQuestion ? (
        <button
          type="button"
          onClick={onFinish}
          className="inline-flex h-10 items-center gap-1.5 rounded-sm bg-[#245640] px-4 text-sm font-semibold text-white transition hover:bg-[#153f30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245640]"
        >
          Finish quiz
          <Check className="size-4" aria-hidden="true" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex h-10 items-center gap-1.5 rounded-sm bg-[#245640] px-4 text-sm font-semibold text-white transition hover:bg-[#153f30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245640]"
        >
          Next
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
