import {
  BOOLEAN_OPTIONS,
  FIELDS,
  QUESTION_TYPES,
  SELECT_OPTIONS,
} from "./libs/constants/constants";
import { QuizOptionReponseDto, QuizQuestionResponseDto } from "@/common/types/quiz";
import QuestionOptions from "./QuestionOptions";

interface Props {
  index: number;
  question: QuizQuestionResponseDto;
  onUpdate: (
    index: number,
    field: keyof QuizQuestionResponseDto,
    value: string | QuizOptionReponseDto[]
  ) => void;
  onRemove: (index: number) => void;
}

export default function QuizQuestionItem({
  index,
  question,
  onUpdate,
  onRemove,
}: Props) {
  const renderQuestionInput = () => {
    switch (question.type) {
      case QUESTION_TYPES.BOOLEAN:
        return (
          <div className="flex gap-4">
            {BOOLEAN_OPTIONS.map(({ label, value }) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`boolean-${index}`}
                  value={value}
                  checked={question.answer === value}
                  onChange={(event) =>
                    onUpdate(index, FIELDS.ANSWER, event.target.value)
                  }
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
            className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none"
            placeholder="Answer"
            value={question.answer}
            onChange={(event) =>
              onUpdate(index, FIELDS.ANSWER, event.target.value)
            }
          />
        );

      case QUESTION_TYPES.CHECKBOX:
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
            onChange={(event) =>
              onUpdate(index, FIELDS.TEXT, event.target.value)
            }
          />
        </label>
        <label className="block">
          <span className="text-white/70">Question Type</span>
          <select
            className="w-full p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none"
            value={question.type}
            onChange={(event) =>
              onUpdate(index, FIELDS.TYPE, event.target.value)
            }
          >
            {SELECT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        {renderQuestionInput()}
      </div>
    </section>
  );
}
