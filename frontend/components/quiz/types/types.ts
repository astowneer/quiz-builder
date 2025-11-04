interface Quiz {
  id: number;
  title: string;
  questions: QuizQuestion[];
}

type QuestionType = "boolean" | "input" | "checkbox";

interface CheckboxOption {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  type: QuestionType;
  question: string;
  options?: CheckboxOption[];
  answer?: string;
}

export { type QuestionType, type CheckboxOption, type QuizQuestion, type Quiz };
