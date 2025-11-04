import { QuestionType, QuizQuestion } from "./types/types";
import QuestionOptions from "./QuestionOptions";

interface Props {
  index: number;
  question: QuizQuestion;
  updateQuestion: (i: number, field: keyof QuizQuestion, value: any) => void;
  removeQuestion: (i: number) => void;
}

export default function QuizQuestionItem({
  index,
  question,
  updateQuestion,
  removeQuestion,
}: Props) {
  const renderQuestionInput = () => {
    switch (question.type) {
      case "boolean":
        return (
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`boolean-${index}`}
                value="true"
                checked={question.answer === "true"}
                onChange={(e) =>
                  updateQuestion(index, "answer", e.target.value)
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
                  updateQuestion(index, "answer", e.target.value)
                }
              />
              False
            </label>
          </div>
        );
      case "input":
        return (
          <input
            type="text"
            className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none"
            placeholder="Answer"
            value={question.answer || ""}
            onChange={(e) => updateQuestion(index, "answer", e.target.value)}
          />
        );
      case "checkbox":
        return (
          <QuestionOptions
            question={question}
            updateQuestion={updateQuestion}
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
        <button type="button" onClick={() => removeQuestion(index)}>
          Remove
        </button>
      </div>
      <div className="space-y-2">
        <label className="block">
          <span className="text-white/70">Question Text</span>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none"
            value={question.question}
            onChange={(e) => updateQuestion(index, "question", e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-white/70">Question Type</span>
          <select
            className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none"
            value={question.type}
            onChange={(e) =>
              updateQuestion(index, "type", e.target.value as QuestionType)
            }
          >
            <option value="input">Input</option>
            <option value="boolean">Boolean</option>
            <option value="checkbox">Checkbox (Multiple Choice)</option>
          </select>
        </label>
        {renderQuestionInput()}
      </div>
    </section>
  );
}
