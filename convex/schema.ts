import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { courseValidator } from "./courseValidators";

export default defineSchema({
  courses: defineTable(courseValidator).index("by_course_id", ["id"]),
  lessonProgress: defineTable({
    owner: v.string(),
    lessonId: v.string(),
  }).index("by_owner_and_lesson_id", ["owner", "lessonId"]),
  quizResults: defineTable({
    owner: v.string(),
    courseId: v.string(),
    score: v.number(),
    total: v.number(),
    correct: v.number(),
    incorrect: v.number(),
    submittedAt: v.number(),
  }).index("by_owner_and_course_id", ["owner", "courseId"]),
});
