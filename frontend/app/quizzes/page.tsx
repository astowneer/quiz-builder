"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QuizItem from "@/components/quiz/QuizItem";
import { quiz } from "@/services/services";

interface Quiz {
  id: number;
  title: string;
  questionCount: number;
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setQuizzes(await quiz.getAll());
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  async function handleDelete(id: number) {
    try {
      const res = await quiz.delete(id);
      if (res.id) setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white text-2xl">
        Loading quizzes...
      </div>
    );
  }

  if (quizzes.length === 0) {
    return <p className="text-center text-white/70">No quizzes available.</p>;
  }

  return (
    <article className="max-w-3xl w-full m-auto space-y-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-5 text-center">All Quizzes</h1>
      <ul className="space-y-4 px-5">
        {quizzes.map((quiz) => (
          <QuizItem
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            questionCount={quiz.questionCount}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <div className="flex justify-center mt-10">
        <Link
          href="/create"
          className="uppercase border-b-4 font-bold text-red-900 hover:text-white leading-8 border-red-900 hover:border-white transition-colors duration-300 ease-in px-5 py-2 rounded-xl"
        >
          + Create New Quiz
        </Link>
      </div>
    </article>
  );
}
