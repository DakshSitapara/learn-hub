import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";
import { courseDocValidator } from "./courseValidators";
import { courseSeeds } from "./courseSeed";

export const list = query({
  args: {},
  returns: v.array(courseDocValidator),
  handler: async (ctx) => {
    return await ctx.db.query("courses").withIndex("by_course_id").take(100);
  },
});

export const getById = query({
  args: { id: v.string() },
  returns: v.union(courseDocValidator, v.null()),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_course_id", (q) => q.eq("id", args.id))
      .unique();
  },
});

export const seed = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    for (const course of courseSeeds) {
      const existing = await ctx.db
        .query("courses")
        .withIndex("by_course_id", (q) => q.eq("id", course.id))
        .unique();

      if (!existing) await ctx.db.insert("courses", course);
    }

    return null;
  },
});
