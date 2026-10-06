"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

import { CourseDetail } from "@/components/courses/course-detail";
import { api } from "@/convex/_generated/api";
import { useCourses } from "@/hooks/use-courses";

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();

  const { isLoading: isCoursesLoading } = useCourses();

  const course = useQuery(api.courses.getById, {
    id: courseId,
  });

  if (course === undefined || isCoursesLoading) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-[#f5f7f2] px-4 py-10 text-[#182b23]">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-4 w-24 rounded bg-[#dfe5dc]" />

          <div className="mt-8 h-80 rounded-md bg-white" />

          <div className="mt-8 h-40 rounded-md bg-white" />
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
            className="mt-5 inline-flex text-sm font-semibold text-[#286448] transition-colors hover:text-[#153f30]"
          >
            Browse all courses
          </Link>
        </div>
      </main>
    );
  }

  return <CourseDetail course={course} />;
}
