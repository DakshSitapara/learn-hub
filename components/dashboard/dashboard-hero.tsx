import { BookOpen, Sparkles } from "lucide-react";

type DashboardHeroProps = {
  courseCount: number;
};

export function DashboardHero({ courseCount }: DashboardHeroProps) {
  return (
    <section className="flex flex-col justify-between gap-7 border-b border-[#dfe5dc] pb-8 sm:flex-row sm:items-end sm:pb-10">
      <div className="max-w-2xl">
        <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#41715b]">
          <Sparkles className="size-3.5" aria-hidden="true" />
          LearnHub / your learning room
        </p>

        <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          Make room for
          <span className="block text-[#327455]">what&apos;s next.</span>
        </h1>

        <p className="mt-4 max-w-xl text-[15px] leading-6 text-[#64736a]">
          Pick up a new skill, keep your momentum, and make every session count.
        </p>
      </div>

      <div className="flex items-center gap-3 self-start rounded-md border border-[#dfe5dc] bg-white px-4 py-3 sm:self-auto">
        <div className="grid size-10 place-items-center rounded-sm bg-[#e7f2e9] text-[#327455]">
          <BookOpen className="size-5" aria-hidden="true" />
        </div>

        <div>
          <p className="text-xs text-[#718078]">Your library</p>
          <p className="text-sm font-semibold text-[#23372d]">
            {courseCount} courses
          </p>
        </div>
      </div>
    </section>
  );
}
