interface QuizDto {
  title: string;
  questions: QuizQuestion[];
}

type QuestionType = "CHECKBOX" | "BOOLEAN" | "INPUT";

interface CheckboxOption {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  type: QuestionType;
  text: string;
  options?: CheckboxOption[];
  answer?: string;
}

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export {
  type QuestionType,
  type CheckboxOption,
  type QuizQuestion,
  type QuizDto,
  type QuizOption,
};
