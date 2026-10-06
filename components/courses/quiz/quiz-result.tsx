import { Check, RotateCcw, Trophy, X } from "lucide-react";

import type { Course } from "@/lib/courses";

export type QuizResultData = {
  score: number;
  total: number;
  correct: number;
  incorrect: number;
  submittedAt: number;
};

type QuizResultProps = {
  course: Course;
  result: QuizResultData;
  resultAnswers: Record<number, number>;
  storageError?: string | null;
  onRetry: () => void;
};

export function QuizResult({
  course,
  result,
  resultAnswers,
  storageError,
  onRetry,
}: QuizResultProps) {
  return (
    <div className="p-5">
      <div className="rounded-md border border-[#dfe8df] bg-[#f7faf6] p-5">
        <div className="flex flex-col items-center text-center">
          <span className="grid size-12 place-items-center rounded-full bg-[#e3f1e6] text-[#28704b]">
            <Trophy className="size-6" aria-hidden="true" />
          </span>

          <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-[#718077]">
            Quiz complete
          </p>

          <p className="mt-1 text-4xl font-bold tabular-nums text-[#243d30]">
            {result.score}%
          </p>

          <p className="mt-1 text-sm text-[#68786f]">
            You answered {result.correct} out of {result.total} questions
            correctly.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 divide-x divide-[#dfe8df] border-y border-[#dfe8df] py-3">
          <div className="px-2 text-center">
            <p className="text-lg font-semibold tabular-nums text-[#28704b]">
              {result.correct}
            </p>
            <p className="mt-0.5 text-[11px] text-[#78857d]">Correct</p>
          </div>

          <div className="px-2 text-center">
            <p className="text-lg font-semibold tabular-nums text-[#b14d39]">
              {result.incorrect}
            </p>
            <p className="mt-0.5 text-[11px] text-[#78857d]">Incorrect</p>
          </div>

          <div className="px-2 text-center">
            <p className="text-lg font-semibold tabular-nums text-[#35473c]">
              {result.total}
            </p>
            <p className="mt-0.5 text-[11px] text-[#78857d]">Questions</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#2d4035]">
              Review your answers
            </h3>

            <p className="mt-0.5 text-xs text-[#78857d]">
              See what you got right and review the explanations.
            </p>
          </div>

          <span className="text-xs font-medium text-[#738078]">
            {result.correct}/{result.total}
          </span>
        </div>

        <div className="space-y-3">
          {course.quiz.map((item, index) => {
            const selectedAnswer = resultAnswers[index];
            const isAnswered = selectedAnswer !== undefined;
            const isCorrect = selectedAnswer === item.answer;

            return (
              <div
                key={item.prompt}
                className={`rounded-md border p-4 ${
                  isCorrect
                    ? "border-[#d7e8da] bg-[#f8fbf8]"
                    : "border-[#eadbd7] bg-[#fffaf8]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
                      isCorrect
                        ? "bg-[#e3f1e6] text-[#2f8154]"
                        : "bg-[#f8e8e4] text-[#b14d39]"
                    }`}
                  >
                    {isCorrect ? (
                      <Check className="size-3.5" aria-hidden="true" />
                    ) : (
                      <X className="size-3.5" aria-hidden="true" />
                    )}
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-5 text-[#35473c]">
                      {index + 1}. {item.prompt}
                    </p>

                    <div className="mt-2 space-y-1 text-xs leading-5">
                      <p className="text-[#68786f]">
                        <span className="font-medium text-[#4e6056]">
                          Your answer:
                        </span>{" "}
                        {isAnswered
                          ? item.options[selectedAnswer]
                          : "Not answered"}
                      </p>

                      {!isCorrect && (
                        <p className="text-[#68786f]">
                          <span className="font-medium text-[#4e6056]">
                            Correct answer:
                          </span>{" "}
                          {item.options[item.answer]}
                        </p>
                      )}
                    </div>

                    <p className="mt-3 border-t border-current/10 pt-3 text-xs leading-5 text-[#748179]">
                      {item.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {storageError && (
        <p
          className="mt-4 rounded-sm border border-[#e4c39d] bg-[#fff7e9] px-3 py-2 text-xs leading-5 text-[#855521]"
          role="alert"
        >
          {storageError}
        </p>
      )}

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-[#245640] text-sm font-semibold text-white transition hover:bg-[#153f30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245640]"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Retry quiz
      </button>
    </div>
  );
}
