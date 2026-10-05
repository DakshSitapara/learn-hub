import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const quizResultValidator = v.object({
  score: v.number(),
  total: v.number(),
  correct: v.number(),
  incorrect: v.number(),
  submittedAt: v.number(),
});

const progressValidator = v.object({
  completedLessonIds: v.array(v.string()),
  quizResults: v.record(v.string(), quizResultValidator),
});

export const getMyProgress = query({
  args: {},
  returns: progressValidator,
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { completedLessonIds: [], quizResults: {} };
    }

    const owner = identity.tokenIdentifier;
    const completedLessons = await ctx.db
      .query("lessonProgress")
      .withIndex("by_owner_and_lesson_id", (q) => q.eq("owner", owner))
      .take(1000);
    const savedQuizResults = await ctx.db
      .query("quizResults")
      .withIndex("by_owner_and_course_id", (q) => q.eq("owner", owner))
      .take(1000);

    const quizResults: Record<
      string,
      {
        score: number;
        total: number;
        correct: number;
        incorrect: number;
        submittedAt: number;
      }
    > = {};

    for (const result of savedQuizResults) {
      quizResults[result.courseId] = {
        score: result.score,
        total: result.total,
        correct: result.correct,
        incorrect: result.incorrect,
        submittedAt: result.submittedAt,
      };
    }

    return {
      completedLessonIds: completedLessons.map((lesson) => lesson.lessonId),
      quizResults,
    };
  },
});

export const toggleLesson = mutation({
  args: { lessonId: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Sign in to save your progress.");

    const existing = await ctx.db
      .query("lessonProgress")
      .withIndex("by_owner_and_lesson_id", (q) =>
        q.eq("owner", identity.tokenIdentifier).eq("lessonId", args.lessonId),
      )
      .unique();

    if (existing) await ctx.db.delete(existing._id);
    else {
      await ctx.db.insert("lessonProgress", {
        owner: identity.tokenIdentifier,
        lessonId: args.lessonId,
      });
    }

    return null;
  },
});

export const setLessonsComplete = mutation({
  args: { lessonIds: v.array(v.string()), complete: v.boolean() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Sign in to save your progress.");

    for (const lessonId of args.lessonIds) {
      const existing = await ctx.db
        .query("lessonProgress")
        .withIndex("by_owner_and_lesson_id", (q) =>
          q.eq("owner", identity.tokenIdentifier).eq("lessonId", lessonId),
        )
        .unique();

      if (args.complete && !existing) {
        await ctx.db.insert("lessonProgress", {
          owner: identity.tokenIdentifier,
          lessonId,
        });
      } else if (!args.complete && existing) {
        await ctx.db.delete(existing._id);
      }
    }

    return null;
  },
});

export const saveQuizResult = mutation({
  args: {
    courseId: v.string(),
    result: quizResultValidator,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Sign in to save your quiz result.");

    const existing = await ctx.db
      .query("quizResults")
      .withIndex("by_owner_and_course_id", (q) =>
        q.eq("owner", identity.tokenIdentifier).eq("courseId", args.courseId),
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, args.result);
    } else {
      await ctx.db.insert("quizResults", {
        owner: identity.tokenIdentifier,
        courseId: args.courseId,
        ...args.result,
      });
    }

    return null;
  },
});
