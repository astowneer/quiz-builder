"use client";

import { useState } from "react";

export default function CreateQuizPage() {
  const [quizTitle, setQuizTitle] = useState("");
  return (
    <article className="w-[800px] m-auto space-y-5 py-10">
      <h2 className="text-2xl font-bold mb-5">Create Quiz</h2>

      <label className="relative text-white w-full">
        <input
          required
          className="peer w-full bg-red-700 p-2 rounded-xl text-white shadow-xl focus:outline-none"
          name="quizTitle"
          type="text"
          placeholder=""
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
        <span className="absolute -top-2 left-2 text-xs text-white/70  transition-all peer-placeholder-shown:block hidden">
          Quiz Title
        </span>
      </label>
    </article>
  );
}
