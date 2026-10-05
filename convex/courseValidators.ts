import { v } from "convex/values";

export const lessonValidator = v.object({
  id: v.string(),
  title: v.string(),
  duration: v.string(),
  summary: v.string(),
  content: v.array(v.string()),
});

export const quizQuestionValidator = v.object({
  prompt: v.string(),
  options: v.array(v.string()),
  answer: v.number(),
  explanation: v.string(),
});

export const courseValidator = v.object({
  id: v.string(),
  title: v.string(),
  category: v.string(),
  level: v.union(
    v.literal("Beginner"),
    v.literal("Intermediate"),
    v.literal("Advanced"),
  ),
  duration: v.string(),
  description: v.string(),
  instructor: v.string(),
  image: v.string(),
  accent: v.string(),
  lessons: v.array(lessonValidator),
  quizMinutes: v.number(),
  quiz: v.array(quizQuestionValidator),
});

export const courseDocValidator = courseValidator.extend({
  _id: v.id("courses"),
  _creationTime: v.number(),
});
