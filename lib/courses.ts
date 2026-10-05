import type { Doc } from "@/convex/_generated/dataModel";

export type Course = Doc<"courses">;
export type Lesson = Course["lessons"][number];
export type QuizQuestion = Course["quiz"][number];
