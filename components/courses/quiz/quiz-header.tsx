import { CircleHelp, Clock3 } from "lucide-react";

type QuizHeaderProps = {
  title: string;
  secondsRemaining?: number;
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const remaining = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remaining}`;
}

export function QuizHeader({ title, secondsRemaining }: QuizHeaderProps) {
  const isLowTime = secondsRemaining !== undefined && secondsRemaining <= 30;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#edf0eb] px-5 py-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-sm bg-[#f5ead8] text-[#a2642b]">
          <CircleHelp className="size-4" aria-hidden="true" />
        </span>

        <h2 className="truncate text-base font-semibold text-[#24372d]">
          {title}
        </h2>
      </div>

      {secondsRemaining !== undefined && (
        <div
          className={`flex shrink-0 items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-xs font-semibold tabular-nums ${
            isLowTime
              ? "bg-[#fff0e8] text-[#a74529]"
              : "bg-[#f1f4ef] text-[#596b60]"
          }`}
          aria-live="polite"
        >
          <Clock3 className="size-3.5" aria-hidden="true" />
          {formatTime(secondsRemaining)}
        </div>
      )}
    </div>
  );
}
