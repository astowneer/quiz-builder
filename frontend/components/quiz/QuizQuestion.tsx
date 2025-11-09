import { QuestionType, QuizQuestion } from "./libs/types/types";
import QuestionOptions from "./QuestionOptions";

interface Props {
  index: number;
  question: QuizQuestion;
  onUpdate: (i: number, field: keyof QuizQuestion, value: any) => void;
  onRemove: (i: number) => void;
}

export default function QuizQuestionItem({
  index,
  question,
  onUpdate,
  onRemove,
}: Props) {
  const renderQuestionInput = () => {
    switch (question.type) {
      case "BOOLEAN":
        return (
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`boolean-${index}`}
                value="true"
                checked={question.answer === "true"}
                onChange={(e) =>
                  onUpdate(index, "answer", e.target.value)
                }
              />
              True
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`boolean-${index}`}
                value="false"
                checked={question.answer === "false"}
                onChange={(e) =>
                  onUpdate(index, "answer", e.target.value)
                }
              />
              False
            </label>
          </div>
        );
      case "INPUT":
        return (
          <input
            type="text"
            className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none"
            placeholder="Answer"
            value={question.answer || ""}
            onChange={(e) => onUpdate(index, "answer", e.target.value)}
          />
        );
      case "CHECKBOX":
        return (
          <QuestionOptions
            question={question}
            onUpdate={onUpdate}
            index={index}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-red-700 rounded-xl shadow-xl p-5 space-y-3">
      <div className="flex justify-between text-white/70 border-b border-red-900 pb-2 mb-2">
        <div>Question {index + 1}</div>
        <button type="button" onClick={() => onRemove(index)}>
          Remove
        </button>
      </div>
      <div className="space-y-2">
        <label className="block">
          <span className="text-white/70">Question Text</span>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none"
            value={question.text}
            onChange={(e) => onUpdate(index, "text", e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-white/70">Question Type</span>
          <select
            className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none"
            value={question.type}
            onChange={(e) =>
              onUpdate(index, "type", e.target.value as QuestionType)
            }
          >
            <option value="INPUT">Input</option>
            <option value="BOOLEAN">Boolean</option>
            <option value="CHECKBOX">Multiple Choice</option>
          </select>
        </label>
        {renderQuestionInput()}
      </div>
    </section>
  );
}
