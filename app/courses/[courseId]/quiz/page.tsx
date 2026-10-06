"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { useCourses } from "@/hooks/use-courses";
import { CourseQuiz } from "@/components/courses/quiz/course-quiz";

export default function CourseQuizPage() {
  const { courseId } = useParams<{ courseId: string }>();

  const { isLoading: isCoursesLoading } = useCourses();

  const course = useQuery(api.courses.getById, {
    id: courseId,
  });

  if (course === undefined || isCoursesLoading) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-[#f5f7f2] px-4 py-10 text-[#182b23]">
        <div className="mx-auto max-w-3xl animate-pulse">
          <div className="h-4 w-28 rounded bg-[#dfe5dc]" />
          <div className="mt-8 h-16 rounded-md bg-white" />
          <div className="mt-4 h-96 rounded-md bg-white" />
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#f5f7f2] px-4 text-center text-[#182b23]">
        <div>
          <h1 className="text-2xl font-semibold">Course not found</h1>

          <p className="mt-2 text-sm text-[#64736a]">
            This course may have been removed.
          </p>

          <Link
            href="/courses"
            className="mt-5 inline-flex text-sm font-semibold text-[#286448] transition hover:text-[#153f30]"
          >
            Browse all courses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#f5f7f2] text-[#182b23]">
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-7 sm:px-6 sm:pt-9">
        <Link
          href={`/courses/${course.id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#607268] transition hover:text-[#1e5d40]"
        >
          ← Back to course
        </Link>

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#688071]">
            {course.title}
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#1b3025] sm:text-4xl">
            Course Quiz
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#64736a]">
            Test your understanding of the course and review your answers when
            you finish.
          </p>
        </div>

        <CourseQuiz course={course} />
      </div>
    </main>
  );
}
