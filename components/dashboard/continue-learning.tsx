import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/lib/courses";

type ContinueLearningProps = {
  course: Course;
  lessonIndex: number;
};

export function ContinueLearning({
  course,
  lessonIndex,
}: ContinueLearningProps) {
  const lesson = course.lessons[lessonIndex];

  if (!lesson) {
    return null;
  }

  return (
    <section className="pb-7 sm:pb-8">
      <div className="overflow-hidden rounded-md border border-[#dfe5dc] bg-white">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#327455]" />

              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#668072]">
                Continue learning
              </p>
            </div>

            <h2 className="mt-2 truncate text-xl font-semibold text-[#23372d]">
              {lesson.title}
            </h2>

            <p className="mt-1 text-sm text-[#718078]">{course.title}</p>

            <p className="mt-3 text-xs text-[#829087]">
              Lesson {lessonIndex + 1} of {course.lessons.length}
            </p>
          </div>

          <Link
            href={`/courses/${course.id}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-[#254f40] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d4235] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#327455]"
          >
            Continue
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
