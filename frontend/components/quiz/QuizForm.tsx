"use client";

import { useState } from "react";
import { QuizQuestion } from "./types/types";
import QuizTitleInput from "./QuizTitleInput";
import QuizQuestionItem from "./QuizQuestion";
import { quiz } from "@/services/services";

export function QuizForm() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    { type: "INPUT", text: "", answer: "" },
  ]);

  const handleAddQuestion = () =>
    setQuestions((prev) => [
      ...prev,
      { type: "INPUT", text: "", answer: "" },
    ]);

  const handleRemoveQuestion = (index: number) =>
    setQuestions((prev) => prev.filter((_, i) => i !== index));

  const handleUpdateQuestion = (
    index: number,
    field: keyof QuizQuestion,
    value: any
  ) =>
    setQuestions((prev) =>
      prev.map((question, i) =>
        i === index ? { ...question, [field]: value } : question
      )
    );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const typeMap: Record<string, string> = {
      CHECKBOX: "CHECKBOX",
      BOOLEAN: "BOOLEAN",
      INPUT: "INPUT",
    };

    const sanitized = questions
      .filter((question) => question.text.trim())
      .map((question) => {
        const type = typeMap[question.type];
        const base = { text: question.text, type };

        switch (type) {
          case "CHECKBOX":
            return {
              text: question.text,
              type: "CHECKBOX" as const,
              options:
                question.options
                  ?.filter((option) => option.text.trim())
                  .map(({ text, isCorrect }) => ({ text, isCorrect })) ?? [],
            };
          case "BOOLEAN":
            return {
              text: question.text,
              type: "BOOLEAN" as const,
              answer: question.answer || "false",
            };
          case "INPUT":
          default:
            return {
              text: question.text,
              type: "INPUT" as const,
              answer: question.answer || "",
            };
        }
      });

    quiz.create({ title: quizTitle, questions: sanitized });

    setQuizTitle("");
    setQuestions([{ type: "INPUT", text: "", answer: "" }]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <QuizTitleInput value={quizTitle} onChange={setQuizTitle} />
      {questions.map((question, index) => (
        <QuizQuestionItem
          key={index}
          index={index}
          question={question}
          onUpdate={handleUpdateQuestion}
          onRemove={handleRemoveQuestion}
        />
      ))}
      <div className="flex justify-center mt-5">
        <button
          type="button"
          onClick={handleAddQuestion}
          className="uppercase border-b-4 font-bold text-red-900 hover:text-white leading-8 border-red-900 hover:border-white transition-colors duration-300 ease-in px-5 py-2 rounded-xl"
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
