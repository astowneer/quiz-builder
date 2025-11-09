"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuestionItem } from "@/components/question/QuestionItem";
import Loading from "@/components/ui/Loading";
import { quizService } from "@/services/services";
import { QuizResponseDto } from "@/common/types/quiz";

export default function QuizDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [quiz, setQuiz] = useState<QuizResponseDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      console.error("Invalid quiz id:", id);
      setLoading(false);
      return;
    }

    quizService
      .getOne(Number(id))
      .then(setQuiz)
      .catch((error) => console.error("Failed to fetch quiz:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!quiz) return <div className="text-white">Quiz not found.</div>;

  return (
    <main className="max-w-3xl w-full mx-auto mt-10 text-white space-y-6 px-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <button
          onClick={() => router.push("/quizzes")}
          className="text-sm text-red-400 hover:text-red-300"
        >
          ← Back
        </button>
      </div>
      {quiz.questions.map((question, index) => (
        <QuestionItem key={index} question={question} index={index} />
      ))}
    </main>
  );
}
