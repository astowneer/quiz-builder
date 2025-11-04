"use client";

import QuizForm from "../../components/quiz/QuizForm";

export default function CreateQuizPage() {
  return (
    <main className="w-full min-h-screen bg-red-500 text-white">
      <article className="w-[800px] m-auto space-y-5 py-10">
        <h2 className="text-2xl font-bold mb-5">Create Quiz</h2>
        <QuizForm />
      </article>
    </main>
  );
}
