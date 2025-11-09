"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  QuestionType,
  QuizDto,
  QuizQuestion,
} from "@/components/quiz/types/types";
import { QuestionItem } from "@/components/question/QuestionItem";

function mapBackendQuestion(q: any): QuizQuestion {
  const typeMap: Record<string, QuestionType> = {
    BOOLEAN: "BOOLEAN",
    INPUT: "INPUT",
    CHECKBOX: "CHECKBOX",
  };

  return {
    text: q.text,
    type: typeMap[q.type] || "input",
    options: q.options?.map((o: any) => ({
      text: o.text,
      isCorrect: !!o.isCorrect,
    })),
    answer: q.answer ?? undefined,
  };
}

function mapBackendQuiz(qz: any): QuizDto {
  return {
    title: qz.title,
    questions: qz.questions.map(mapBackendQuestion),
  };
}

export default function QuizDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<QuizDto | null>(null);
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
  if (quiz.questions.length === 0)
    return <div className="text-white/60">No questions in this quiz yet.</div>;

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
      {quiz.questions.map((q, i) => (
        <QuestionItem key={i} question={q} index={i} />
      ))}
    </main>
  );
}
