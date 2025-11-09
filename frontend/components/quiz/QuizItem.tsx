import Link from "next/link";

interface Props {
  id: number;
  title: string;
  questionCount: number;
  onDelete: (id: number) => void;
}

export default function QuizItem({
  id,
  title,
  questionCount,
  onDelete,
}: Props) {
  return (
    <li className="bg-red-700 w-full rounded-xl shadow-xl p-5 flex justify-between items-center hover:bg-red-800 transition duration-300 ease-in">
      <Link
        href={`/quizzes/${id}`}
        className="flex flex-col flex-1 min-w-0 text-white hover:text-white/80"
      >
        <div className="text-xl font-bold truncate">{title}</div>
        <span className="text-sm text-white/70">
          {questionCount} {questionCount === 1 ? "question" : "questions"}
        </span>
      </Link>
      <button
        onClick={() => onDelete(id)}
        className="text-red-900 hover:text-white transition-colors duration-300 ease-in"
      >
        Delete
      </button>
    </li>
  );
}
