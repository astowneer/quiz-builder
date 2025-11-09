interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function QuizTitleInput({ value, onChange }: Props) {
  return (
    <label className="text-white w-full block">
      <input
        required
        className="peer w-full bg-red-700 p-2 rounded-xl text-white shadow-xl focus:outline-none"
        name="quizTitle"
        type="text"
        placeholder="Quiz title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
