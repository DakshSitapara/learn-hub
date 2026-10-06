import Link from "next/link";
import { ArrowRight, Check, Clock3 } from "lucide-react";

import type { Course } from "@/lib/courses";

type CourseCardProps = {
  course: Course;
  completedIds: Set<string>;
  hasQuizResult: boolean;
  horizontal?: boolean;
};

function getCourseProgress(lessonIds: string[], completedIds: Set<string>) {
  const completed = lessonIds.filter((id) => completedIds.has(id)).length;

  return {
    completed,
    percent: lessonIds.length
      ? Math.round((completed / lessonIds.length) * 100)
      : 0,
  };
}

export function CourseCard({
  course,
  completedIds,
  hasQuizResult,
  horizontal = false,
}: CourseCardProps) {
  const lessonIds = course.lessons.map((lesson) => lesson.id);

  const progress = getCourseProgress(lessonIds, completedIds);

  const isCompleted = progress.percent === 100;
  const isStarted = progress.percent > 0;

  return (
    <Link
      href={`/courses/${course.id}`}
      data-course-card={horizontal ? "" : undefined}
      className={`group flex h-full flex-col overflow-hidden rounded-lg border border-[#dfe5dc] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#b5cbbd] hover:shadow-[0_16px_35px_-22px_rgba(31,67,49,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#327455] ${
        horizontal
          ? "w-[18rem] shrink-0 snap-start sm:w-[19rem] lg:w-[20rem]"
          : ""
      }`}
    >
      <div
        role="img"
        aria-label={`${course.title} course cover`}
        className="relative h-40 shrink-0 overflow-hidden bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.01]"
        style={{
          backgroundColor: course.accent,
          backgroundImage: `url("${course.image}")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#284e40] shadow-sm">
          {course.category}
        </span>

        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[#102e27]/90 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm">
          <Clock3 className="size-3.5" aria-hidden="true" />
          {course.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#f1f5f1] px-2.5 py-1 text-[11px] font-semibold text-[#557064]">
            {course.level}
          </span>

          <span className="text-[11px] font-medium text-[#7a8981]">
            {course.lessons.length} lessons
          </span>
        </div>

        <h3 className="mt-4 min-h-12 text-[18px] font-semibold leading-6 tracking-[-0.01em] text-[#182b23] transition-colors group-hover:text-[#1b624d]">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-[13px] leading-5 text-[#6d7b73]">
          {course.description}
        </p>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#46574e]">
              {isCompleted
                ? "Course complete"
                : isStarted
                  ? "In progress"
                  : "Not started"}
            </span>

            <span className="text-xs font-semibold tabular-nums text-[#52635a]">
              {progress.percent}%
            </span>
          </div>

          <div
            className="h-2 overflow-hidden rounded-full bg-[#e8ede8]"
            role="progressbar"
            aria-label={`${course.title} progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress.percent}
          >
            <div
              className={`h-full rounded-full transition-[width] duration-500 ${
                isCompleted ? "bg-[#327455]" : "bg-[#4d8c6b]"
              }`}
              style={{
                width: `${progress.percent}%`,
              }}
            />
          </div>

          <p className="mt-2 text-[11px] text-[#829087]">
            {progress.completed} of {course.lessons.length} lessons completed
          </p>
        </div>

        <div className="mt-auto pt-5">
          <div className="border-t border-[#edf0eb] pt-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#94a098]">
                  Instructor
                </p>

                <p className="mt-0.5 truncate text-xs font-medium text-[#5f7067]">
                  {course.instructor}
                </p>
              </div>

              <div className="shrink-0">
                {isCompleted ? (
                  <span className="flex items-center gap-1.5 rounded-full bg-[#e8f3eb] px-2.5 py-1.5 text-[11px] font-semibold text-[#287152]">
                    <Check className="size-3.5" aria-hidden="true" />
                    Completed
                  </span>
                ) : hasQuizResult ? (
                  <span className="rounded-full bg-[#f1f5f1] px-2.5 py-1.5 text-[11px] font-semibold text-[#668072]">
                    Quiz completed
                  </span>
                ) : (
                  <span className="grid size-8 place-items-center rounded-full border border-[#dce5de] text-[#537365] transition-all duration-200 group-hover:border-[#327455] group-hover:bg-[#eaf3ed] group-hover:text-[#1f674c]">
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
