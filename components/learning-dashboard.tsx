"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Search,
  Sparkles,
} from "lucide-react";
import { useLearningProgress } from "@/hooks/use-learning-progress";
import { useCourses } from "@/hooks/use-courses";
import type { Course } from "@/lib/courses";

const filters = ["All courses", "In progress", "Completed"] as const;
type CourseFilter = (typeof filters)[number];

function getCourseProgress(
  courseId: string,
  lessonIds: string[],
  completedIds: Set<string>,
) {
  const completed = lessonIds.filter((id) => completedIds.has(id)).length;
  return {
    completed,
    percent: lessonIds.length
      ? Math.round((completed / lessonIds.length) * 100)
      : 0,
  };
}

function CourseCard({
  course,
  completedIds,
  hasQuizResult,
  horizontal = false,
}: {
  course: Course;
  completedIds: Set<string>;
  hasQuizResult: boolean;
  horizontal?: boolean;
}) {
  const lessonIds = course.lessons.map((lesson) => lesson.id);
  const progress = getCourseProgress(course.id, lessonIds, completedIds);

  return (
    <Link
      href={`/courses/${course.id}`}
      data-course-card={horizontal ? "" : undefined}
      className={`group flex h-full flex-col overflow-hidden rounded-md border border-[#dfe4dc] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#9db9a5] hover:shadow-[0_12px_30px_-20px_rgba(31,67,49,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b624d] ${horizontal ? "w-[min(84vw,21rem)] shrink-0 snap-start sm:w-[min(43vw,21rem)] lg:w-[21rem]" : ""}`}
    >
      <div
        role="img"
        aria-label={`${course.title} course cover`}
        className="relative h-44 shrink-0 bg-cover bg-center"
        style={{
          backgroundColor: course.accent,
          backgroundImage: `url("${course.image}")`,
        }}
      >
        <span className="absolute left-4 top-4 rounded-sm bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#284e40]">
          {course.category}
        </span>
        <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-sm bg-[#102e27]/90 px-2.5 py-1.5 text-xs font-medium text-white">
          <Clock3 className="size-3.5" aria-hidden="true" />
          {course.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-[#587166]">
            {course.level}
          </span>
          <span className="text-xs text-[#76857c]">
            {course.lessons.length} lessons
          </span>
        </div>
        <h3 className="text-[19px] font-semibold leading-6 text-[#182b23] group-hover:text-[#1b624d]">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[#68776e]">
          {course.description}
        </p>

        <div className="mt-auto pt-6">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-[#46574e]">
              {progress.percent === 100 ? "Course complete" : "Your progress"}
            </span>
            <span className="tabular-nums text-[#52635a]">
              {progress.percent}%
            </span>
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-[#e8ede8]"
            role="progressbar"
            aria-label={`${course.title} progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress.percent}
          >
            <div
              className="h-full rounded-full bg-[#237356] transition-[width] duration-500"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-[#edf0eb] pt-3 text-xs text-[#77847c]">
            <span>With {course.instructor}</span>
            {hasQuizResult ? (
              <span className="flex items-center gap-1 font-semibold text-[#287152]">
                <Check className="size-3.5" aria-hidden="true" />
                Finished
              </span>
            ) : (
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function LearningDashboard({
  libraryOnly = false,
}: {
  libraryOnly?: boolean;
}) {
  const {
    progress,
    isReady: isProgressReady,
    storageError,
  } = useLearningProgress();
  const { courses, isLoading: isCoursesLoading } = useCourses();
  const [filter, setFilter] = useState<CourseFilter>("All courses");
  const [search, setSearch] = useState("");
  const courseTrackRef = useRef<HTMLDivElement>(null);
  const completedIds = new Set(progress.completedLessonIds);
  const isReady = isProgressReady && !isCoursesLoading;
  const totalLessons = courses.reduce(
    (total, course) => total + course.lessons.length,
    0,
  );
  const completedLessons = progress.completedLessonIds.filter((id) =>
    courses.some((course) => course.lessons.some((lesson) => lesson.id === id)),
  ).length;
  const overallPercent = totalLessons
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;
  const completedCourses = courses.filter((course) =>
    course.lessons.every((lesson) => completedIds.has(lesson.id)),
  ).length;
  const visibleCourses = courses.filter((course) => {
    const courseProgress = getCourseProgress(
      course.id,
      course.lessons.map((lesson) => lesson.id),
      completedIds,
    );
    const matchesFilter =
      filter === "All courses" ||
      (filter === "In progress" &&
        courseProgress.percent > 0 &&
        courseProgress.percent < 100) ||
      (filter === "Completed" && courseProgress.percent === 100);
    const searchText =
      `${course.title} ${course.category} ${course.instructor}`.toLowerCase();
    return matchesFilter && searchText.includes(search.trim().toLowerCase());
  });
  const courseTrackClass = libraryOnly
    ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
    : "flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4";

  function scrollCourseTrack(direction: -1 | 1) {
    const track = courseTrackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-course-card]");
    const distance = firstCard ? firstCard.offsetWidth + 20 : track.clientWidth;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#f5f7f2] text-[#182b23]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        {!libraryOnly && (
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
                Pick up a new skill, keep your momentum, and make every session
                count.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-md border border-[#dfe5dc] bg-white px-4 py-3 sm:self-auto">
              <div className="grid size-10 place-items-center rounded-sm bg-[#e7f2e9] text-[#327455]">
                <BookOpen className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-[#718078]">Your library</p>
                <p className="text-sm font-semibold text-[#23372d]">
                  {courses.length} courses
                </p>
              </div>
            </div>
          </section>
        )}

        {!libraryOnly && (
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
                      style={{ width: `${isReady ? overallPercent : 0}%` }}
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
                  {isReady
                    ? completedLessons.toString().padStart(2, "0")
                    : "--"}
                </p>
                <p className="mt-1 text-sm text-[#7b8880]">
                  small steps add up
                </p>
              </div>
              <div className="grid size-12 place-items-center rounded-sm bg-[#f4ead8] text-[#a2642b]">
                <Check className="size-5" aria-hidden="true" />
              </div>
            </div>
          </section>
        )}

        {storageError && (
          <p
            className="mb-6 rounded-sm border border-[#e4c39d] bg-[#fff7e9] px-4 py-3 text-sm text-[#855521]"
            role="alert"
          >
            {storageError}
          </p>
        )}

        <section aria-labelledby="course-library-title">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#668072]">
                Curated for your next step
              </p>
              <h2
                id="course-library-title"
                className="mt-1 text-2xl font-semibold"
              >
                {libraryOnly ? "All courses" : "Explore courses"}
              </h2>
            </div>
            <div className="flex w-full items-center gap-2 sm:max-w-105">
              <label className="relative block min-w-0 flex-1">
                <span className="sr-only">Search courses</span>
                <Search
                  className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#77867d]"
                  aria-hidden="true"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search courses"
                  className="h-10 w-full rounded-sm border border-[#dbe2da] bg-white pl-9 pr-3 text-sm outline-none transition focus:border-[#4a8b68] focus:ring-2 focus:ring-[#4a8b68]/15"
                />
              </label>
              {!libraryOnly && (
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => scrollCourseTrack(-1)}
                    aria-label="Scroll courses left"
                    aria-controls="home-course-carousel"
                    title="Scroll courses left"
                    className="grid size-10 place-items-center rounded-sm border border-[#dbe2da] bg-white text-[#486256] transition hover:border-[#91aa98] hover:text-[#1e5d40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#327455]"
                  >
                    <ChevronLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCourseTrack(1)}
                    aria-label="Scroll courses right"
                    aria-controls="home-course-carousel"
                    title="Scroll courses right"
                    className="grid size-10 place-items-center rounded-sm border border-[#dbe2da] bg-white text-[#486256] transition hover:border-[#91aa98] hover:text-[#1e5d40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#327455]"
                  >
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className="mb-6 flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter courses"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={`rounded-sm px-3.5 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "bg-[#254f40] text-white"
                    : "border border-[#dce3dc] bg-white text-[#5e6f65] hover:border-[#91aa98] hover:text-[#284d3d]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {!isReady ? (
            <div className={courseTrackClass} aria-label="Loading courses">
              {Array.from({ length: 8 }, (_, index) => (
                <div
                  key={index}
                  className={`h-97.5 animate-pulse rounded-md border border-[#e1e6df] bg-white ${libraryOnly ? "" : "w-[min(84vw,21rem)] shrink-0 snap-start sm:w-[min(43vw,21rem)] lg:w-[21rem]"}`}
                />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed border-[#cbd6ca] bg-white px-6 text-center">
              <BookOpen className="size-6 text-[#799083]" aria-hidden="true" />
              <h3 className="mt-3 text-base font-semibold text-[#2b4035]">
                No courses available
              </h3>
              <p className="mt-1 max-w-sm text-sm text-[#718078]">
                The course catalog is empty. Check back after courses have been
                added.
              </p>
            </div>
          ) : visibleCourses.length ? (
            <div
              id={libraryOnly ? undefined : "home-course-carousel"}
              ref={libraryOnly ? undefined : courseTrackRef}
              className={courseTrackClass}
              role={libraryOnly ? undefined : "region"}
              aria-label={libraryOnly ? undefined : "Course carousel"}
              tabIndex={libraryOnly ? undefined : 0}
            >
              {visibleCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  completedIds={completedIds}
                  hasQuizResult={Boolean(progress.quizResults[course.id])}
                  horizontal={!libraryOnly}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed border-[#cbd6ca] bg-white px-6 text-center">
              <Search className="size-6 text-[#799083]" aria-hidden="true" />
              <h3 className="mt-3 text-base font-semibold text-[#2b4035]">
                No courses match that view
              </h3>
              <p className="mt-1 max-w-sm text-sm text-[#718078]">
                Try another filter or search term to find your next lesson.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter("All courses");
                  setSearch("");
                }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#286448] hover:text-[#153f30]"
              >
                Show all courses{" "}
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
