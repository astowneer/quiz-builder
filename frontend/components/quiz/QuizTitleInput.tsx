interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function QuizTitleInput({ value, onChange }: Props) {
  return (
    <label className="relative text-white w-full">
      <input
        required
        className="peer w-full bg-red-700 p-2 rounded-xl text-white shadow-xl focus:outline-none"
        name="quizTitle"
        type="text"
        placeholder=""
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="absolute -top-2 left-2 text-xs text-white/70 transition-all peer-placeholder-shown:block hidden">
        Quiz Title
      </span>
    </label>
  );
}
