"use client";

import { QuizForm } from "../../components/quiz/QuizForm";

export default function CreateQuizPage() {
  return (
    <main className="min-h-screen bg-red-500 text-white">
      <article className="max-w-3xl m-auto space-y-5 py-10 px-5">
        <h1 className="text-2xl font-bold mb-5">Create Quiz</h1>
        <QuizForm />
      </article>
    </main>
  );
}
