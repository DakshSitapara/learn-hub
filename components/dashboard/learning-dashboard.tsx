"use client";

import { useState } from "react";

import { useLearningProgress } from "@/hooks/use-learning-progress";
import { useCourses } from "@/hooks/use-courses";

import { DashboardHero } from "./dashboard-hero";
import { LearningProgress } from "./learning-progress";
import { ContinueLearning } from "./continue-learning";
import { CourseLibrary } from "./course-library";

const filters = ["All courses", "In progress", "Completed"] as const;

type CourseFilter = (typeof filters)[number];

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

  const completedCourses = courses.filter(
    (course) =>
      course.lessons.length > 0 &&
      course.lessons.every((lesson) => completedIds.has(lesson.id)),
  ).length;

  const continueCourse = courses.find((course) =>
    course.lessons.some((lesson) => !completedIds.has(lesson.id)),
  );

  const continueLessonIndex = continueCourse
    ? continueCourse.lessons.findIndex((lesson) => !completedIds.has(lesson.id))
    : -1;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#f5f7f2] text-[#182b23]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        {!libraryOnly && <DashboardHero courseCount={courses.length} />}

        {!libraryOnly && (
          <LearningProgress
            isReady={isReady}
            overallPercent={overallPercent}
            completedLessons={completedLessons}
            totalLessons={totalLessons}
            completedCourses={completedCourses}
          />
        )}

        {!libraryOnly &&
          isReady &&
          continueCourse &&
          continueLessonIndex >= 0 && (
            <ContinueLearning
              course={continueCourse}
              lessonIndex={continueLessonIndex}
            />
          )}

        {storageError && (
          <p
            className="mb-6 rounded-sm border border-[#e4c39d] bg-[#fff7e9] px-4 py-3 text-sm text-[#855521]"
            role="alert"
          >
            {storageError}
          </p>
        )}

        <CourseLibrary
          courses={courses}
          completedIds={completedIds}
          quizResults={progress.quizResults}
          filter={filter}
          search={search}
          isReady={isReady}
          libraryOnly={libraryOnly}
          onFilterChange={setFilter}
          onSearchChange={setSearch}
        />
      </div>
    </main>
  );
}
