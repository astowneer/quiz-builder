import { QuizQuestion } from "./libs/types/types";

interface Props {
  question: QuizQuestion;
  index: number;
  onUpdate: (i: number, field: keyof QuizQuestion, value: any) => void;
}

export default function QuestionOptions({ question, index, onUpdate }: Props) {
  const addOption = () => {
    const opts = question.options || [];
    onUpdate(index, "options", [...opts, { text: "", isCorrect: false }]);
  };

  const removeOption = (optIndex: number) => {
    const newOpts = question.options?.filter((_, i) => i !== optIndex);
    onUpdate(index, "options", newOpts);
  };

  const updateOptionText = (optIndex: number, text: string) => {
    const newOpts = [...(question.options || [])];
    newOpts[optIndex].text = text;
    onUpdate(index, "options", newOpts);
  };

  const toggleCorrect = (optIndex: number) => {
    const newOpts = [...(question.options || [])];
    newOpts[optIndex].isCorrect = !newOpts[optIndex].isCorrect;
    onUpdate(index, "options", newOpts);
  };

  return (
    <div className="space-y-2">
      {question.options?.map((opt, optIndex) => (
        <div key={optIndex} className="flex gap-2 items-center">
          <input
            type="text"
            className="p-2 rounded-md bg-transparent border-b-4 border-red-900 text-white focus:border-white outline-none flex-1"
            placeholder="Option text"
            value={opt.text}
            onChange={(e) => updateOptionText(optIndex, e.target.value)}
          />
          <label className="flex items-center gap-1 text-white/70">
            <input
              type="checkbox"
              checked={opt.isCorrect}
              onChange={() => toggleCorrect(optIndex)}
            />
            Correct
          </label>
          <button
            type="button"
            onClick={() => removeOption(optIndex)}
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
