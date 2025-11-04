"use client";

import { useState } from "react";
import { QuizQuestion } from "./types/types";
import QuizTitleInput from "./QuizTitleInput";
import QuizQuestionItem from "./QuizQuestion";

export default function QuizForm() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    { type: "input", question: "", answer: "" },
  ]);

  const addQuestion = () =>
    setQuestions((prev) => [...prev, { type: "input", question: "", answer: "" }]);

  const removeQuestion = (index: number) =>
    setQuestions((prev) => prev.filter((_, i) => i !== index));

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) =>
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const sanitized = questions
      .filter((q) => q.question.trim())
      .map((q) => {
        if (q.type === "checkbox") {
          return {
            text: q.question,
            type: "CHECKBOX",
            options: q.options
              ?.filter((opt) => opt.text.trim())
              .map((opt) => ({ text: opt.text, isCorrect: opt.isCorrect })),
          };
        }
        if (q.type === "boolean") {
          return {
            text: q.question,
            type: "BOOLEAN",
            answer: q.answer === "true",
          };
        }
        return { text: q.question, type: "INPUT", answer: q.answer || "" };
      });

    await fetch("http://localhost:3000/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: quizTitle, questions: sanitized }),
    });

    setQuizTitle("");
    setQuestions([{ type: "input", question: "", answer: "" }]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <QuizTitleInput value={quizTitle} onChange={setQuizTitle} />
      {questions.map((q, index) => (
        <QuizQuestionItem
          key={index}
          index={index}
          question={q}
          updateQuestion={updateQuestion}
          removeQuestion={removeQuestion}
        />
      ))}
      <div className="flex justify-center mt-5">
        <button
          type="button"
          onClick={addQuestion}
          className="uppercase border-b-4 font-bold text-red-900 hover:text-white leading-8 border-red-900 hover:border-white transition-colors duration-500 ease-in px-5 py-2 rounded-xl"
        >
          Add Question
        </button>
      </div>
      <div className="flex justify-end mt-5">
        <button
          type="submit"
          className="text-xl mt-5 shadow-lg bg-red-700 block w-fit py-2 px-5 rounded-xl mb-10 hover:bg-red-800 duration-300 ease-in"
        >
          Submit Quiz
        </button>
      </div>
    </form>
  );
}
