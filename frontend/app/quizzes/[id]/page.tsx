"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export type QuestionType = "boolean" | "input" | "checkbox";

export interface CheckboxOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id?: number;
  question: string;
  type: QuestionType;
  options?: CheckboxOption[];
  answer?: string | boolean;
}

export interface Quiz {
  id: number;
  title: string;
  questions: QuizQuestion[];
}

function mapBackendQuestion(q: any): QuizQuestion {
  const typeMap: Record<string, QuestionType> = {
    BOOLEAN: "boolean",
    INPUT: "input",
    CHECKBOX: "checkbox",
  };

  return {
    id: q.id,
    question: q.text,
    type: typeMap[q.type] || "input",
    options: q.options?.map((o: any) => ({
      text: o.text,
      isCorrect: !!o.isCorrect,
    })),
    answer: q.answer ?? undefined,
  };
}

function mapBackendQuiz(qz: any): Quiz {
  return {
    id: qz.id,
    title: qz.title,
    questions: qz.questions.map(mapBackendQuestion),
  };
}

export default function QuizDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:3000/quizzes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch quiz");
        const data = await res.json();
        setQuiz(mapBackendQuiz(data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (!quiz) return <div className="text-white">Quiz not found.</div>;

  return (
    <main className="max-w-2xl mx-auto mt-10 text-white space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <button
          onClick={() => router.push("/quizzes")}
          className="text-sm text-red-400 hover:text-red-300"
        >
          ← Back
        </button>
      </div>

      {quiz.questions.length === 0 && (
        <div className="text-white/60">No questions in this quiz yet.</div>
      )}

      {quiz.questions.map((q, i) => (
        <section
          key={i}
          className="bg-red-700 rounded-xl shadow-lg p-5 space-y-3 border border-red-900"
        >
          <div className="flex justify-between border-b border-red-900 pb-2 text-white/70">
            <div>Question {i + 1}</div>
            <div className="text-sm italic">{q.type}</div>
          </div>
          <p className="font-semibold">{q.question}</p>

          {q.type === "boolean" && (
            <div className="flex gap-6 text-white/80">
              <label className="flex items-center gap-2">
                <input type="radio" checked={q.answer === true} readOnly /> True
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" checked={q.answer === false} readOnly />{" "}
                False
              </label>
            </div>
          )}
          {q.type === "input" && (
            <input
              type="text"
              value={typeof q.answer === "string" ? q.answer : ""}
              readOnly
              className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white outline-none"
            />
          )}
          {q.type === "checkbox" && (
            <div className="space-y-2">
              {q.options?.map((opt, j) => (
                <label
                  key={j}
                  className="flex items-center gap-2 text-white/80"
                >
                  <input type="checkbox" checked={opt.isCorrect} readOnly />
                  {opt.text}
                </label>
              ))}
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
