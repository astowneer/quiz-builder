"use client";

import { useRouter } from "next/navigation";
import { QuizForm } from "../../components/quiz/QuizForm";

export default function CreateQuizPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-red-500 text-white">
      <article className="max-w-3xl m-auto space-y-5 py-10 px-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-5">Create Quiz</h1>
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.push("/quizzes")}
              className="text-sm text-red-400 hover:text-red-300"
            >
              ← Back
            </button>
          </div>
        </div>
        <QuizForm />
      </article>
    </main>
  );
}
