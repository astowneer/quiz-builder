import { QUESTION_TYPES } from "../constants/constants";
import { QuizQuestionResponseDto } from "@/common/types/quiz";

const sanitizeQuestion = (question: QuizQuestionResponseDto) => {
  const text = question.text.trim();
  if (!text) return null;

  switch (question.type) {
    case QUESTION_TYPES.CHECKBOX:
      return {
        text,
        type: QUESTION_TYPES.CHECKBOX,
        options:
          question.options
            ?.filter((option) => option.text.trim())
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

const sanitizeQuestions = (questions: QuizQuestionResponseDto[]) => {
  return questions.reduce(
    (accumulator: QuizQuestionResponseDto[], question) => {
      const sanitized = sanitizeQuestion(question);

      if (sanitized) accumulator.push(sanitized);

      return accumulator;
    },
    []
  );
};

export { sanitizeQuestions };
