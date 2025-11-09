import {
  BOOLEAN_OPTIONS,
  QUESTION_TYPES,
} from "../quiz/libs/constants/constants";
import { QuizQuestion } from "../quiz/libs/types/types";

export function QuestionItem({
  question,
  index,
}: {
  question: QuizQuestion;
  index: number;
}) {
  const renderQuestionContent = () => {
    switch (question.type) {
      case QUESTION_TYPES.BOOLEAN:
        return (
          <div className="flex gap-6 text-white/80">
            {BOOLEAN_OPTIONS.map(({ label, value }) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`boolean-${index}`}
                  value={value}
                  checked={question.answer === value}
                  readOnly
                />
                {label}
              </label>
            ))}
          </div>
        );

      case QUESTION_TYPES.INPUT:
        return (
          <input
            type="text"
            value={question.answer}
            readOnly
            className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white outline-none"
          />
        );

      case QUESTION_TYPES.CHECKBOX:
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-2 text-white/80"
              >
                <input type="checkbox" checked={option.isCorrect} readOnly />
                {option.text}
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="bg-red-700 rounded-xl shadow-lg p-5 space-y-3 border border-red-900">
      <div className="flex justify-between border-b border-red-900 pb-2 text-white/70">
        <div>Question {index + 1}</div>
        <div className="text-sm italic">{question.type}</div>
      </div>
      <p className="font-semibold">{question.text}</p>
      {renderQuestionContent()}
    </section>
  );
}
