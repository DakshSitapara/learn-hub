import { CircleHelp } from "lucide-react";

type QuizSubmitConfirmationProps = {
  unansweredCount: number;
  onContinue: () => void;
  onSubmit: () => void;
};

export function QuizSubmitConfirmation({
  unansweredCount,
  onContinue,
  onSubmit,
}: QuizSubmitConfirmationProps) {
  return (
    <div
      className="mt-4 rounded-md border border-[#e4c39d] bg-[#fff9ef] p-4"
      role="alertdialog"
      aria-labelledby="submit-quiz-title"
      aria-describedby="submit-quiz-description"
    >
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f8ead5] text-[#a2642b]">
          <CircleHelp className="size-4" aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <h3
            id="submit-quiz-title"
            className="text-sm font-semibold text-[#4a3522]"
          >
            You have unanswered questions
          </h3>

          <p
            id="submit-quiz-description"
            className="mt-1 text-xs leading-5 text-[#765f48]"
          >
            {unansweredCount}{" "}
            {unansweredCount === 1 ? "question is" : "questions are"}{" "}
            unanswered. If you submit now, unanswered questions will be counted
            as incorrect.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex h-9 items-center justify-center rounded-sm border border-[#d7dfd6] bg-white px-3 text-xs font-semibold text-[#4f6257] transition hover:bg-[#f5f7f4]"
            >
              Continue quiz
            </button>

            <button
              type="button"
              onClick={onSubmit}
              className="inline-flex h-9 items-center justify-center rounded-sm bg-[#245640] px-3 text-xs font-semibold text-white transition hover:bg-[#153f30]"
            >
              Submit anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
