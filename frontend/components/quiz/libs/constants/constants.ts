import { QuizQuestion } from "../types/types";

const DEFAULT_QUESTION: QuizQuestion = { type: "INPUT", text: "", answer: "" };

const QUESTION_TYPES = {
  INPUT: "INPUT",
  BOOLEAN: "BOOLEAN",
  CHECKBOX: "CHECKBOX",
} as const;

export { DEFAULT_QUESTION, QUESTION_TYPES };
