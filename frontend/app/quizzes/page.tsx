"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Quiz {
  id: number;
  title: string;
  questions: { id: number }[];
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await fetch("http://localhost:3000/quizzes", {
          cache: "no-store",
        });
        const data = await res.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizzes();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      const res = await fetch(`http://localhost:3000/quizzes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
      } else {
        console.error("Failed to delete quiz");
      }
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

  return (
    <article className="w-[800px] m-auto space-y-8 py-10 text-white">
      <h2 className="text-3xl font-bold mb-5 text-center">All Quizzes</h2>
      {quizzes.length === 0 ? (
        <p className="text-center text-white/70">No quizzes available.</p>
      ) : (
        <ul className="space-y-4">
          {quizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="bg-red-700 rounded-xl shadow-xl p-5 flex justify-between items-center hover:bg-red-800 transition duration-300 ease-in"
            >
              <Link
                href={`/quizzes/${quiz.id}`}
                className="flex flex-col text-white hover:text-white/80"
              >
                <span className="text-xl font-bold">
                  {quiz.title || "Untitled Quiz"}
                </span>
                <span className="text-sm text-white/70">
                  {quiz.questions?.length || 0}{" "}
                  {quiz.questions?.length === 1 ? "Question" : "Questions"}
                </span>
              </Link>
              <button
                onClick={() => handleDelete(quiz.id)}
                className="text-red-900 hover:text-white transition-colors duration-300 ease-in"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-center mt-10">
        <Link
          href="/create"
          className="uppercase border-b-4 font-bold text-red-900 hover:text-white leading-8 border-red-900 hover:border-white transition-colors duration-500 ease-in px-5 py-2 rounded-xl"
        >
          + Create New Quiz
        </Link>
      </div>
    </article>
  );
}
