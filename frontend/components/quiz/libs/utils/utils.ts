import { QUESTION_TYPES } from "../constants/constants";
import { QuizQuestion } from "../types/types";

const sanitizeQuestion = (question: QuizQuestion) => {
  const text = question.text.trim();
  if (!text) return null;

  switch (question.type) {
    case QUESTION_TYPES.CHECKBOX:
      return {
        text,
        type: QUESTION_TYPES.CHECKBOX,
        options:
          question.options
            ?.filter((opt) => opt.text.trim())
            .map(({ text, isCorrect }) => ({ text, isCorrect })) ?? [],
      };

    case QUESTION_TYPES.BOOLEAN:
      return {
        text,
        type: QUESTION_TYPES.BOOLEAN,
        answer: question.answer || "false",
      };

    case QUESTION_TYPES.INPUT:
    default:
      return {
        text,
        type: QUESTION_TYPES.INPUT,
        answer: question.answer || "",
      };
  }
};

const sanitizeQuestions = (questions: QuizQuestion[]) => {
  return questions.reduce((accumulator: QuizQuestion[], question) => {
    const sanitized = sanitizeQuestion(question);

    if (sanitized) accumulator.push(sanitized);

    return accumulator;
  }, []);
};

export { sanitizeQuestions };
