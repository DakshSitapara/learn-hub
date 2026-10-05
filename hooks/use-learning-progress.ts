"use client";

import { useState } from "react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export type QuizResult = {
  score: number;
  total: number;
  correct: number;
  incorrect: number;
  submittedAt: number;
};

export type LearningProgress = {
  completedLessonIds: string[];
  quizResults: Record<string, QuizResult>;
};

const emptyProgress: LearningProgress = {
  completedLessonIds: [],
  quizResults: {},
};

export function useLearningProgress() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const savedProgress = useQuery(
    api.progress.getMyProgress,
    isLoading ? "skip" : {},
  );
  const toggleLessonMutation = useMutation(api.progress.toggleLesson);
  const setLessonsCompleteMutation = useMutation(
    api.progress.setLessonsComplete,
  );
  const saveQuizResultMutation = useMutation(api.progress.saveQuizResult);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const progress = savedProgress ?? emptyProgress;
  const isReady = !isLoading && savedProgress !== undefined;
  const storageError =
    mutationError ??
    (!isLoading && !isAuthenticated
      ? "Sign in to save your progress and quiz results."
      : null);

  function handleMutationError() {
    setMutationError(
      "Could not save to Convex. Check your connection and try again.",
    );
  }

  function toggleLesson(lessonId: string) {
    setMutationError(null);
    void toggleLessonMutation({ lessonId }).catch(handleMutationError);
  }

  function setCourseComplete(lessonIds: string[], complete: boolean) {
    setMutationError(null);
    void setLessonsCompleteMutation({ lessonIds, complete }).catch(
      handleMutationError,
    );
  }

  function saveQuizResult(courseId: string, result: QuizResult) {
    setMutationError(null);
    void saveQuizResultMutation({ courseId, result }).catch(
      handleMutationError,
    );
  }

  return {
    progress,
    storageError,
    isReady,
    isAuthenticated,
    toggleLesson,
    setCourseComplete,
    saveQuizResult,
  };
}
