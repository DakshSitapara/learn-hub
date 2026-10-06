"use client";

import { useEffect, useRef, useState } from "react";

import type { Course } from "@/lib/courses";
import { useLearningProgress } from "@/hooks/use-learning-progress";

import { QuizHeader } from "./quiz-header";
import { QuizProgress } from "./quiz-progress";
import { QuizQuestion } from "./quiz-question";
import { QuizNavigation } from "./quiz-navigation";
import { QuizSubmitConfirmation } from "./quiz-submit-confirmation";
import { QuizResult, type QuizResultData } from "./quiz-result";

type QuizStatus = "ready" | "active" | "result";

export function CourseQuiz({ course }: { course: Course }) {
  const { progress, storageError, saveQuizResult } = useLearningProgress();

  const [status, setStatus] = useState<QuizStatus>("ready");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [resultAnswers, setResultAnswers] = useState<Record<number, number>>(
    {},
  );
  const [secondsRemaining, setSecondsRemaining] = useState(
    course.quizMinutes * 60,
  );
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResultData | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const answersRef = useRef<Record<number, number>>({});
  const finishedRef = useRef(false);
  const finishQuizRef = useRef<() => void>(() => {});

  const lastResult = progress.quizResults[course.id];
  const question = course.quiz[questionIndex];

  function finishQuiz() {
    if (finishedRef.current) {
      return;
    }

    finishedRef.current = true;

    const correct = course.quiz.reduce(
      (total, item, index) =>
        total + (answersRef.current[index] === item.answer ? 1 : 0),
      0,
    );

    const quizResult: QuizResultData = {
      score: Math.round((correct / course.quiz.length) * 100),
      total: course.quiz.length,
      correct,
      incorrect: course.quiz.length - correct,
      submittedAt: Date.now(),
    };

    saveQuizResult(course.id, quizResult);

    setResultAnswers({ ...answersRef.current });
    setResult(quizResult);
    setStatus("result");
  }

  useEffect(() => {
    finishQuizRef.current = finishQuiz;
  });

  useEffect(() => {
    if (status !== "active" || endsAt === null) {
      return;
    }

    const timer = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));

      setSecondsRemaining(remaining);

      if (remaining === 0) {
        finishQuizRef.current();
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [endsAt, status]);

  function handleFinishQuiz() {
    const unansweredCount = course.quiz.length - Object.keys(answers).length;

    if (unansweredCount > 0) {
      setShowSubmitConfirm(true);
      return;
    }

    finishQuiz();
  }

  function startQuiz() {
    answersRef.current = {};
    finishedRef.current = false;

    setAnswers({});
    setResultAnswers({});
    setResult(null);
    setShowSubmitConfirm(false);

    setQuestionIndex(0);
    setSecondsRemaining(course.quizMinutes * 60);
    setEndsAt(Date.now() + course.quizMinutes * 60 * 1000);
    setStatus("active");
  }

  function chooseAnswer(optionIndex: number) {
    const nextAnswers = {
      ...answersRef.current,
      [questionIndex]: optionIndex,
    };

    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);
  }

  if (status === "ready") {
    return (
      <section className="rounded-md border border-[#dfe5dc] bg-white">
        <QuizHeader title="Course quiz" />

        <div className="p-5">
          <p className="text-sm leading-6 text-[#65756b]">
            Check what stuck with a short, timed quiz. You can move between
            questions and review every answer at the end.
          </p>

          <div className="mt-5 grid grid-cols-2 divide-x divide-[#e8ede7] border-y border-[#e8ede7] py-3">
            <div className="pr-3">
              <p className="text-lg font-semibold text-[#273c31]">
                {course.quiz.length}
              </p>
              <p className="text-xs text-[#78857d]">questions</p>
            </div>

            <div className="pl-4">
              <p className="text-lg font-semibold text-[#273c31]">
                {course.quizMinutes} min
              </p>
              <p className="text-xs text-[#78857d]">time limit</p>
            </div>
          </div>

          {lastResult && (
            <p className="mt-4 text-xs text-[#68786f]">
              Latest result:{" "}
              <strong className="text-[#2b6045]">{lastResult.score}%</strong>
              <span>
                {" "}
                · {lastResult.correct} correct, {lastResult.incorrect} incorrect
              </span>
            </p>
          )}

          <button
            type="button"
            onClick={startQuiz}
            className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-[#245640] px-4 text-sm font-semibold text-white transition hover:bg-[#153f30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245640]"
          >
            {lastResult ? "Try again" : "Start quiz"}
          </button>
        </div>
      </section>
    );
  }

  if (status === "active" && question) {
    const unansweredCount = course.quiz.length - Object.keys(answers).length;

    return (
      <section className="rounded-md border border-[#dfe5dc] bg-white">
        <QuizHeader title="Quick check" secondsRemaining={secondsRemaining} />

        <div className="p-5">
          <QuizProgress
            questionIndex={questionIndex}
            totalQuestions={course.quiz.length}
            answeredCount={Object.keys(answers).length}
          />

          <QuizQuestion
            question={question}
            questionIndex={questionIndex}
            selectedAnswer={answers[questionIndex]}
            onSelect={chooseAnswer}
          />

          <QuizNavigation
            questionIndex={questionIndex}
            totalQuestions={course.quiz.length}
            onPrevious={() =>
              setQuestionIndex((index) => Math.max(0, index - 1))
            }
            onNext={() =>
              setQuestionIndex((index) =>
                Math.min(course.quiz.length - 1, index + 1),
              )
            }
            onFinish={handleFinishQuiz}
          />

          {showSubmitConfirm && (
            <QuizSubmitConfirmation
              unansweredCount={unansweredCount}
              onContinue={() => setShowSubmitConfirm(false)}
              onSubmit={() => {
                setShowSubmitConfirm(false);
                finishQuiz();
              }}
            />
          )}
        </div>
      </section>
    );
  }

  if (status === "result" && result) {
    return (
      <section className="rounded-md border border-[#dfe5dc] bg-white">
        <QuizHeader title="Quiz result" />

        <QuizResult
          course={course}
          result={result}
          resultAnswers={resultAnswers}
          storageError={storageError}
          onRetry={startQuiz}
        />
      </section>
    );
  }

  return null;
}
