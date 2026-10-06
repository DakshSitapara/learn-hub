"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  RotateCcw,
  Trophy,
  X,
} from "lucide-react";
import type { Course } from "@/lib/courses";
import { useLearningProgress } from "@/hooks/use-learning-progress";

type QuizStatus = "ready" | "active" | "result";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remaining = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remaining}`;
}

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
  const [result, setResult] = useState<{
    score: number;
    total: number;
    correct: number;
    incorrect: number;
    submittedAt: number;
  } | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const answersRef = useRef<Record<number, number>>({});
  const finishedRef = useRef(false);
  const finishQuizRef = useRef<() => void>(() => {});
  const lastResult = progress.quizResults[course.id];
  const question = course.quiz[questionIndex];

  function finishQuiz() {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const correct = course.quiz.reduce(
      (total, item, index) =>
        total + (answersRef.current[index] === item.answer ? 1 : 0),
      0,
    );
    const quizResult = {
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
    if (status !== "active" || endsAt === null) return;

    const timer = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining === 0) finishQuizRef.current();
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
    const nextAnswers = { ...answersRef.current, [questionIndex]: optionIndex };
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);
  }

  const panelTitle = status === "active" ? "Quick check" : "Course quiz";

  return (
    <section
      className="rounded-md border border-[#dfe5dc] bg-white"
      aria-labelledby="quiz-title"
    >
      <div className="flex items-center justify-between border-b border-[#edf0eb] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-sm bg-[#f5ead8] text-[#a2642b]">
            <CircleHelp className="size-4" aria-hidden="true" />
          </span>
          <h2
            id="quiz-title"
            className="text-base font-semibold text-[#24372d]"
          >
            {panelTitle}
          </h2>
        </div>
        {status === "active" && (
          <div
            className={`flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-xs font-semibold tabular-nums ${
              secondsRemaining <= 30
                ? "bg-[#fff0e8] text-[#a74529]"
                : "bg-[#f1f4ef] text-[#596b60]"
            }`}
            aria-live="polite"
          >
            <Clock3 className="size-3.5" aria-hidden="true" />
            {formatTime(secondsRemaining)}
          </div>
        )}
      </div>

      {status === "ready" && (
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
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {status === "active" && question && (
        <div className="p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-xs font-medium text-[#738078]">
              Question {questionIndex + 1} of {course.quiz.length}
            </p>
            <p className="text-xs tabular-nums text-[#738078]">
              {Object.keys(answers).length} answered
            </p>
          </div>
          <div className="mb-5 h-1 overflow-hidden rounded-full bg-[#e8ede7]">
            <div
              className="h-full rounded-full bg-[#4a9168] transition-[width]"
              style={{
                width: `${((questionIndex + 1) / course.quiz.length) * 100}%`,
              }}
            />
          </div>
          <h3 className="text-[17px] font-semibold leading-6 text-[#263a30]">
            {question.prompt}
          </h3>
          <div className="mt-4 space-y-2.5">
            {question.options.map((option, optionIndex) => {
              const selected = answers[questionIndex] === optionIndex;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => chooseAnswer(optionIndex)}
                  aria-pressed={selected}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-sm border px-3 py-2.5 text-left text-sm leading-5 transition ${
                    selected
                      ? "border-[#448660] bg-[#edf5ee] text-[#244c37]"
                      : "border-[#e3e9e2] bg-white text-[#5d6c63] hover:border-[#9fbaa5] hover:bg-[#f8faf7]"
                  }`}
                >
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded-full border text-[10px] font-semibold ${
                      selected
                        ? "border-[#327455] bg-[#327455] text-white"
                        : "border-[#cbd5cd] text-[#77867c]"
                    }`}
                  >
                    {selected ? (
                      <Check className="size-3" aria-hidden="true" />
                    ) : (
                      String.fromCharCode(65 + optionIndex)
                    )}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-[#edf0eb] pt-4">
            <button
              type="button"
              onClick={() =>
                setQuestionIndex((index) => Math.max(0, index - 1))
              }
              disabled={questionIndex === 0}
              className="inline-flex h-9 items-center gap-1 rounded-sm px-2 text-sm font-medium text-[#5b6d62] transition hover:bg-[#f4f6f2] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-4" aria-hidden="true" /> Previous
            </button>
            {questionIndex < course.quiz.length - 1 ? (
              <button
                type="button"
                onClick={() =>
                  setQuestionIndex((index) =>
                    Math.min(course.quiz.length - 1, index + 1),
                  )
                }
                className="inline-flex h-9 items-center gap-1 rounded-sm bg-[#245640] px-3 text-sm font-semibold text-white transition hover:bg-[#153f30]"
              >
                Next <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishQuiz}
                className="inline-flex h-9 items-center gap-1 rounded-sm bg-[#245640] px-3 text-sm font-semibold text-white transition hover:bg-[#153f30]"
              >
                Finish quiz <Check className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {showSubmitConfirm && (
            <div
              className="mt-4 rounded-md border border-[#e4c39d] bg-[#fff9ef] p-4"
              role="alertdialog"
              aria-labelledby="submit-quiz-title"
              aria-describedby="submit-quiz-description"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f8ead5] text-[#a2642b]">
                  <CircleHelp className="size-4" aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <h3
                    id="submit-quiz-title"
                    className="text-sm font-semibold text-[#4a3522]"
                  >
                    You have unanswered questions
                  </h3>

                  <p
                    id="submit-quiz-description"
                    className="mt-1 text-xs leading-5 text-[#765f48]"
                  >
                    {course.quiz.length - Object.keys(answers).length}{" "}
                    {course.quiz.length - Object.keys(answers).length === 1
                      ? "question is"
                      : "questions are"}{" "}
                    unanswered. If you submit now, unanswered questions will be
                    counted as incorrect.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSubmitConfirm(false)}
                      className="inline-flex h-9 items-center justify-center rounded-sm border border-[#d7dfd6] bg-white px-3 text-xs font-semibold text-[#4f6257] transition hover:bg-[#f5f7f4]"
                    >
                      Continue quiz
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowSubmitConfirm(false);
                        finishQuiz();
                      }}
                      className="inline-flex h-9 items-center justify-center rounded-sm bg-[#245640] px-3 text-xs font-semibold text-white transition hover:bg-[#153f30]"
                    >
                      Submit anyway
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {status === "result" && result && (
        <div className="p-5">
          <div className="rounded-md border border-[#dfe8df] bg-[#f7faf6] p-5">
            <div className="flex flex-col items-center text-center">
              <span className="grid size-12 place-items-center rounded-full bg-[#e3f1e6] text-[#28704b]">
                <Trophy className="size-6" aria-hidden="true" />
              </span>

              <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-[#718077]">
                Quiz complete
              </p>

              <p className="mt-1 text-4xl font-bold tabular-nums text-[#243d30]">
                {result.score}%
              </p>

              <p className="mt-1 text-sm text-[#68786f]">
                You answered {result.correct} out of {result.total} questions
                correctly.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 divide-x divide-[#dfe8df] border-y border-[#dfe8df] py-3">
              <div className="px-2 text-center">
                <p className="text-lg font-semibold tabular-nums text-[#28704b]">
                  {result.correct}
                </p>
                <p className="mt-0.5 text-[11px] text-[#78857d]">Correct</p>
              </div>

              <div className="px-2 text-center">
                <p className="text-lg font-semibold tabular-nums text-[#b14d39]">
                  {result.incorrect}
                </p>
                <p className="mt-0.5 text-[11px] text-[#78857d]">Incorrect</p>
              </div>

              <div className="px-2 text-center">
                <p className="text-lg font-semibold tabular-nums text-[#35473c]">
                  {result.total}
                </p>
                <p className="mt-0.5 text-[11px] text-[#78857d]">Questions</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#2d4035]">
                  Review your answers
                </h3>

                <p className="mt-0.5 text-xs text-[#78857d]">
                  See what you got right and review the explanations.
                </p>
              </div>

              <span className="text-xs font-medium text-[#738078]">
                {result.correct}/{result.total}
              </span>
            </div>

            <div className="space-y-3">
              {course.quiz.map((item, index) => {
                const selectedAnswer = resultAnswers[index];
                const isAnswered = selectedAnswer !== undefined;
                const isCorrect = selectedAnswer === item.answer;

                return (
                  <div
                    key={item.prompt}
                    className={`rounded-md border p-4 ${
                      isCorrect
                        ? "border-[#d7e8da] bg-[#f8fbf8]"
                        : "border-[#eadbd7] bg-[#fffaf8]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
                          isCorrect
                            ? "bg-[#e3f1e6] text-[#2f8154]"
                            : "bg-[#f8e8e4] text-[#b14d39]"
                        }`}
                      >
                        {isCorrect ? (
                          <Check className="size-3.5" aria-hidden="true" />
                        ) : (
                          <X className="size-3.5" aria-hidden="true" />
                        )}
                      </span>

                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-5 text-[#35473c]">
                          {index + 1}. {item.prompt}
                        </p>

                        <div className="mt-2 space-y-1 text-xs leading-5">
                          <p className="text-[#68786f]">
                            <span className="font-medium text-[#4e6056]">
                              Your answer:
                            </span>{" "}
                            {isAnswered
                              ? item.options[selectedAnswer]
                              : "Not answered"}
                          </p>

                          {!isCorrect && (
                            <p className="text-[#68786f]">
                              <span className="font-medium text-[#4e6056]">
                                Correct answer:
                              </span>{" "}
                              {item.options[item.answer]}
                            </p>
                          )}
                        </div>

                        <p className="mt-3 border-t border-current/10 pt-3 text-xs leading-5 text-[#748179]">
                          {item.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {storageError && (
            <p
              className="mt-4 rounded-sm border border-[#e4c39d] bg-[#fff7e9] px-3 py-2 text-xs leading-5 text-[#855521]"
              role="alert"
            >
              {storageError}
            </p>
          )}

          <button
            type="button"
            onClick={startQuiz}
            className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-[#245640] text-sm font-semibold text-white transition hover:bg-[#153f30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245640]"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Retry quiz
          </button>
        </div>
      )}
    </section>
  );
}
