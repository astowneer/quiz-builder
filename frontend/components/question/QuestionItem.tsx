import { QuizQuestion } from "../quiz/types/types";
import { QuestionContent } from "./QuestionContent";

export function QuestionItem({
  question,
  index,
}: {
  question: QuizQuestion;
  index: number;
}) {
  return (
    <section className="bg-red-700 rounded-xl shadow-lg p-5 space-y-3 border border-red-900">
      <div className="flex justify-between border-b border-red-900 pb-2 text-white/70">
        <div>Question {index + 1}</div>
        <div className="text-sm italic">{question.type}</div>
      </div>
      <p className="font-semibold">{question.question}</p>
      <QuestionContent question={question} />
    </section>
  );
}
