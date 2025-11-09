import { QuizOption, QuizQuestion } from "./libs/types/types";

interface Props {
  question: QuizQuestion;
  index: number;
  onUpdate: (i: number, field: keyof QuizQuestion, value: any) => void;
}

export default function QuestionOptions({ question, index, onUpdate }: Props) {
  const options: QuizOption[] = question.options || [];

  const updateOptions = (newOptions: QuizOption[]) =>
    onUpdate(index, "options", newOptions);

  const addOption = () =>
    updateOptions([...options, { text: "", isCorrect: false }]);

  const removeOption = (index: number) =>
    updateOptions(options.filter((_, i) => i !== index));

  const updateOptionText = (index: number, text: string) => {
    const newOptions = options.map((option, i) =>
      i === index ? { ...option, text } : option
    );
    updateOptions(newOptions);
  };

  const toggleCorrect = (index: number) => {
    const newOptions = options.map((option, i) =>
      i === index ? { ...option, isCorrect: !option.isCorrect } : option
    );
    updateOptions(newOptions);
  };

  return (
    <div className="space-y-2">
      {question.options?.map((option, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            className="p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none flex-1"
            placeholder="Option text"
            value={option.text}
            onChange={(event) => updateOptionText(index, event.target.value)}
          />
          <label className="flex items-center gap-1 text-white/70">
            <input
              type="checkbox"
              checked={option.isCorrect}
              onChange={() => toggleCorrect(index)}
            />
            Correct
          </label>
          <button
            type="button"
            onClick={() => removeOption(index)}
            className="text-red-900 hover:text-white"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addOption}
        className="text-white hover:text-white/70"
      >
        + Add Option
      </button>
    </div>
  );
}
