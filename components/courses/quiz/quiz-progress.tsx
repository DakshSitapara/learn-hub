type QuizProgressProps = {
  questionIndex: number;
  totalQuestions: number;
  answeredCount: number;
};

export function QuizProgress({
  questionIndex,
  totalQuestions,
  answeredCount,
}: QuizProgressProps) {
  const progress =
    totalQuestions > 0 ? ((questionIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <div className="mb-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-[#738078]">
          Question {questionIndex + 1} of {totalQuestions}
        </p>

        <p className="text-xs tabular-nums text-[#738078]">
          {answeredCount} answered
        </p>
      </div>

      <div
        className="h-1.5 overflow-hidden rounded-full bg-[#e8ede7]"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div
          className="h-full rounded-full bg-[#4a9168] transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
