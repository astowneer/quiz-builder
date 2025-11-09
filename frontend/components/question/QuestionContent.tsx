import { QuizQuestion } from "../quiz/types/types";

export function QuestionContent({ question }: { question: QuizQuestion }) {
  switch (question.type) {
    case "BOOLEAN":
      return (
        <div className="flex gap-6 text-white/80">
          <label className="flex items-center gap-2">
            <input type="radio" checked={question.answer === 'true'} readOnly />{" "}
            True
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={question.answer === 'false'} readOnly />{" "}
            False
          </label>
        </div>
      );
    case "INPUT":
      return (
        <input
          type="text"
          value={question.answer !== undefined ? String(question.answer) : ""}
          readOnly
          className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white outline-none"
        />
      );
    case "CHECKBOX":
      return (
        <div className="space-y-2">
          {question.options?.map((opt, j) => (
            <label key={j} className="flex items-center gap-2 text-white/80">
              <input type="checkbox" checked={opt.isCorrect} readOnly />
              {opt.text}
            </label>
          ))}
        </div>
      );
    default:
      return null;
  }
}
