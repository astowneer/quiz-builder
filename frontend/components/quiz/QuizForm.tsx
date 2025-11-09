"use client";

import { useState } from "react";
import QuizTitleInput from "./QuizTitleInput";
import QuizQuestionItem from "./QuizQuestion";
import { quizService } from "@/services/services";
import { DEFAULT_QUESTION } from "./libs/constants/constants";
import { sanitizeQuestions } from "./libs/utils/utils";
import { QuizOptionReponseDto, QuizQuestionResponseDto } from "@/common/types/quiz";

export function QuizForm() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<QuizQuestionResponseDto[]>([
    DEFAULT_QUESTION,
  ]);

  const handleAddQuestion = () =>
    setQuestions((prev) => [...prev, { ...DEFAULT_QUESTION }]);

  const handleRemoveQuestion = (index: number) =>
    setQuestions((prev) => prev.filter((_, i) => i !== index));

  const handleUpdateQuestion = (
    index: number,
    field: keyof QuizQuestionResponseDto,
    value?: string | QuizOptionReponseDto[]
  ) =>
    setQuestions((prev) =>
      prev.map((question, i) =>
        i === index ? { ...question, [field]: value } : question
      )
    );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const sanitized = sanitizeQuestions(questions);
    if (!quizTitle.trim() || !sanitized.length) return;

    try {
      await quizService.create({ title: quizTitle, questions: sanitized });
      setQuizTitle("");
      setQuestions([{ ...DEFAULT_QUESTION }]);
    } catch (err) {
      console.error("Failed to create quiz:", err);
    }
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
