"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import type { Course } from "@/lib/courses";
import { CourseCard } from "./course-card";
import { CourseLibrarySkeleton } from "./course-library-skeleton";

type CourseFilter = "All courses" | "In progress" | "Completed";

type CourseLibraryProps = {
  courses: Course[];
  completedIds: Set<string>;
  quizResults: Record<string, unknown>;
  filter: CourseFilter;
  search: string;
  isReady: boolean;
  libraryOnly: boolean;
  onFilterChange: (filter: CourseFilter) => void;
  onSearchChange: (search: string) => void;
};

export function CourseLibrary({
  courses,
  completedIds,
  quizResults,
  filter,
  search,
  isReady,
  libraryOnly,
  onFilterChange,
  onSearchChange,
}: CourseLibraryProps) {
  const courseTrackRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const filters: CourseFilter[] = ["All courses", "In progress", "Completed"];

  const visibleCourses = courses.filter((course) => {
    const completed = course.lessons.filter((lesson) =>
      completedIds.has(lesson.id),
    ).length;

    const percent = course.lessons.length
      ? Math.round((completed / course.lessons.length) * 100)
      : 0;

    const matchesFilter =
      filter === "All courses" ||
      (filter === "In progress" && percent > 0 && percent < 100) ||
      (filter === "Completed" && percent === 100);

    const searchText =
      `${course.title} ${course.category} ${course.instructor}`.toLowerCase();

    return matchesFilter && searchText.includes(search.trim().toLowerCase());
  });

  function scrollCourseTrack(direction: -1 | 1) {
    const track = courseTrackRef.current;

    if (!track) {
      return;
    }

    const firstCard = track.querySelector<HTMLElement>("[data-course-card]");

    const distance = firstCard ? firstCard.offsetWidth + 20 : track.clientWidth;

    track.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const track = courseTrackRef.current;

    if (!track) {
      return;
    }

    setIsDragging(true);
    hasDragged.current = false;

    dragStartX.current = event.clientX;
    dragScrollLeft.current = track.scrollLeft;

    track.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const track = courseTrackRef.current;

    if (!track || !isDragging) {
      return;
    }

    const distance = event.clientX - dragStartX.current;

    if (Math.abs(distance) > 6) {
      hasDragged.current = true;
    }

    track.scrollLeft = dragScrollLeft.current - distance;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const track = courseTrackRef.current;

    if (!track) {
      return;
    }

    setIsDragging(false);

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  }

  function handlePointerCancel() {
    setIsDragging(false);
  }

  function handleClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    if (hasDragged.current) {
      event.preventDefault();
      event.stopPropagation();

      hasDragged.current = false;
    }
  }

  const courseTrackClass = libraryOnly
    ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
    : "flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 scrollbar-hide";

  return (
    <section aria-labelledby="course-library-title">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#668072]">
            Curated for your next step
          </p>

          <h2 id="course-library-title" className="mt-1 text-2xl font-semibold">
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
              onChange={(event) => onSearchChange(event.target.value)}
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
                className="grid size-10 place-items-center rounded-sm border border-[#dbe2da] bg-white text-[#486256] transition hover:border-[#91aa98] hover:text-[#1e5d40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#327455]"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => scrollCourseTrack(1)}
                aria-label="Scroll courses right"
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
            onClick={() => onFilterChange(item)}
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
        <CourseLibrarySkeleton libraryOnly={libraryOnly} />
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
          ref={courseTrackRef}
          className={`${courseTrackClass} ${
            !libraryOnly
              ? `cursor-grab select-none touch-pan-y ${
                  isDragging ? "cursor-grabbing" : ""
                }`
              : ""
          }`}
          onPointerDown={!libraryOnly ? handlePointerDown : undefined}
          onPointerMove={!libraryOnly ? handlePointerMove : undefined}
          onPointerUp={!libraryOnly ? handlePointerUp : undefined}
          onPointerCancel={!libraryOnly ? handlePointerCancel : undefined}
          onClickCapture={!libraryOnly ? handleClickCapture : undefined}
        >
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              completedIds={completedIds}
              hasQuizResult={Boolean(quizResults[course.id])}
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
              onFilterChange("All courses");
              onSearchChange("");
            }}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#286448] hover:text-[#153f30]"
          >
            Show all courses
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
