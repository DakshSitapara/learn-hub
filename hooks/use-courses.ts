"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useCourses() {
  const courses = useQuery(api.courses.list, {});

  return {
    courses: courses ?? [],
    isLoading: courses === undefined,
  };
}
