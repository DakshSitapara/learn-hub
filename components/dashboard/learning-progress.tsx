import { Check } from "lucide-react";

type LearningProgressProps = {
  isReady: boolean;
  overallPercent: number;
  completedLessons: number;
  totalLessons: number;
  completedCourses: number;
};

export function LearningProgress({
  isReady,
  overallPercent,
  completedLessons,
  totalLessons,
  completedCourses,
}: LearningProgressProps) {
  return (
    <section className="grid gap-5 py-7 sm:grid-cols-[minmax(0,1.5fr)_minmax(240px,0.8fr)] sm:py-8">
      <div className="relative overflow-hidden rounded-md bg-[#174a3d] p-6 text-white sm:p-8">
        <div className="absolute -right-8 -top-12 size-48 rounded-full border border-white/10" />
        <div className="absolute -right-2 -top-6 size-36 rounded-full border border-white/10" />

        <div className="relative flex h-full flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b8d8c2]">
              Your momentum
            </p>

            <p className="mt-3 text-3xl font-semibold tabular-nums">
              {isReady ? `${overallPercent}%` : "--"}
            </p>

            <p className="mt-1 text-sm text-[#d2e2d7]">
              of your learning path complete
            </p>
          </div>

          <div className="w-full max-w-65">
            <div className="mb-2 flex justify-between text-xs text-[#c4dbcb]">
              <span>
                {isReady
                  ? `${completedLessons} of ${totalLessons} lessons`
                  : "Loading progress"}
              </span>

              <span>{completedCourses} courses finished</span>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full bg-white/15"
              role="progressbar"
              aria-label="Overall learning progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={isReady ? overallPercent : 0}
            >
              <div
                className="h-full rounded-full bg-[#c2e09e] transition-[width] duration-500"
                style={{
                  width: `${isReady ? overallPercent : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-md border border-[#dfe5dc] bg-white p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#75847b]">
            Lessons checked off
          </p>

          <p className="mt-2 text-3xl font-semibold tabular-nums text-[#23372d]">
            {isReady ? completedLessons.toString().padStart(2, "0") : "--"}
          </p>

          <p className="mt-1 text-sm text-[#7b8880]">small steps add up</p>
        </div>

        <div className="grid size-12 place-items-center rounded-sm bg-[#f4ead8] text-[#a2642b]">
          <Check className="size-5" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
