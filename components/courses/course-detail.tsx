"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
} from "lucide-react";
import type { Course } from "@/lib/courses";
import { useLearningProgress } from "@/hooks/use-learning-progress";
import { CourseQuiz } from "@/components/courses/course-quiz";

export function CourseDetail({ course }: { course: Course }) {
  const {
    progress,
    isReady,
    isAuthenticated,
    storageError,
    toggleLesson,
    setCourseComplete,
  } = useLearningProgress();
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const lessonIds = course.lessons.map((lesson) => lesson.id);
  const completedIds = new Set(progress.completedLessonIds);
  const completedCount = lessonIds.filter((id) => completedIds.has(id)).length;
  const percent = lessonIds.length
    ? Math.round((completedCount / lessonIds.length) * 100)
    : 0;
  const isCourseComplete =
    lessonIds.length > 0 && completedCount === lessonIds.length;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#f5f7f2] text-[#182b23]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-7 sm:px-6 sm:pt-9 lg:px-8">
        <Link
          href="/courses"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#607268] transition hover:text-[#1e5d40]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> All courses
        </Link>

        <section className="grid overflow-hidden rounded-md border border-[#dfe5dc] bg-white md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div
            role="img"
            aria-label={`${course.title} course cover`}
            className="min-h-60 bg-cover bg-center md:min-h-85"
            style={{
              backgroundColor: course.accent,
              backgroundImage: `url("${course.image}")`,
            }}
          />
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#597567]">
              <span>{course.category}</span>
              <span aria-hidden="true">/</span>
              <span>{course.level}</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#1b3025] sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-4 text-[15px] leading-6 text-[#64736a]">
              {course.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#edf0eb] pt-5 text-sm text-[#65756b]">
              <span className="inline-flex items-center gap-2">
                <GraduationCap
                  className="size-4 text-[#508164]"
                  aria-hidden="true"
                />
                {course.instructor}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4 text-[#508164]" aria-hidden="true" />
                {course.duration}
              </span>
              <span className="inline-flex items-center gap-2">
                <BookOpen
                  className="size-4 text-[#508164]"
                  aria-hidden="true"
                />
                {course.lessons.length} lessons
              </span>
            </div>
          </div>
        </section>

        {storageError && (
          <p
            className="mt-5 rounded-sm border border-[#e4c39d] bg-[#fff7e9] px-4 py-3 text-sm text-[#855521]"
            role="alert"
          >
            {storageError}
          </p>
        )}

        <div className="mt-8 space-y-10">
          <section aria-labelledby="lesson-list-title">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#688071]">
                  Course outline
                </p>
                <h2
                  id="lesson-list-title"
                  className="mt-1 text-2xl font-semibold"
                >
                  Lessons
                </h2>
              </div>
              <p className="text-sm tabular-nums text-[#66766d]">
                {isReady
                  ? `${completedCount} of ${lessonIds.length} complete`
                  : "Loading progress"}
              </p>
            </div>

            <div
              className="mb-5 h-1.5 overflow-hidden rounded-full bg-[#e2e9e1]"
              role="progressbar"
              aria-label={`${course.title} lesson progress`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={isReady ? percent : 0}
            >
              <div
                className="h-full rounded-full bg-[#38815b] transition-[width] duration-500"
                style={{ width: `${isReady ? percent : 0}%` }}
              />
            </div>

            <ol className="divide-y divide-[#e6ebe4] border-y border-[#e6ebe4]">
              {course.lessons.map((lesson, index) => {
                const isComplete = completedIds.has(lesson.id);
                const isExpanded = expandedLessonId === lesson.id;
                return (
                  <li key={lesson.id} className="py-4">
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-1 grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                          isComplete
                            ? "bg-[#dcefe0] text-[#286d49]"
                            : "bg-[#e9eee8] text-[#62766a]"
                        }`}
                      >
                        {isComplete ? (
                          <Check className="size-4" aria-hidden="true" />
                        ) : (
                          `0${index + 1}`
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedLessonId(isExpanded ? null : lesson.id)
                          }
                          aria-expanded={isExpanded}
                          className="flex w-full items-start justify-between gap-3 text-left"
                        >
                          <span>
                            <span className="block text-[15px] font-semibold leading-5 text-[#293d32]">
                              {lesson.title}
                            </span>
                            <span className="mt-1 block text-sm leading-5 text-[#718078]">
                              {lesson.summary}
                            </span>
                          </span>
                          <span className="mt-0.5 flex shrink-0 items-center gap-2 text-xs text-[#75837b]">
                            {lesson.duration}
                            <ChevronDown
                              className={`size-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                              aria-hidden="true"
                            />
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="mt-4 space-y-3 border-l-2 border-[#c3d8c7] pl-4 text-sm leading-6 text-[#63736a]">
                            {lesson.content.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleLesson(lesson.id)}
                        disabled={!isAuthenticated}
                        aria-label={`${isComplete ? "Mark lesson incomplete" : "Mark lesson complete"}: ${lesson.title}`}
                        title={
                          !isAuthenticated
                            ? "Sign in to save your progress"
                            : isComplete
                              ? "Mark lesson incomplete"
                              : "Mark lesson complete"
                        }
                        className={`grid size-9 shrink-0 place-items-center rounded-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#327455] disabled:cursor-not-allowed disabled:opacity-50 ${
                          isComplete
                            ? "text-[#328053] hover:bg-[#e7f2e9]"
                            : "text-[#819087] hover:bg-[#edf3ed] hover:text-[#2a704c]"
                        }`}
                      >
                        <CheckCircle2 className="size-5" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>

            <button
              type="button"
              onClick={() => setCourseComplete(lessonIds, !isCourseComplete)}
              disabled={!isReady || !isAuthenticated}
              className={`mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-sm px-4 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-60 ${
                isCourseComplete
                  ? "border border-[#d6e1d7] bg-white text-[#3c6b4d] hover:bg-[#f3f7f2]"
                  : "bg-[#245640] text-white hover:bg-[#153f30]"
              }`}
            >
              <Check className="size-4" aria-hidden="true" />
              {isCourseComplete
                ? "Mark course in progress"
                : "Mark course complete"}
            </button>
          </section>

          <div className="max-w-3xl">
            <CourseQuiz course={course} />
            <p className="mt-3 px-1 text-xs leading-5 text-[#77847b]">
              Your latest score and lesson progress are saved to your account.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
