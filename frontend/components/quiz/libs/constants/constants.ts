import { QuestionType, QuizQuestion } from "../types/types";

const DEFAULT_QUESTION: QuizQuestion = { type: "INPUT", text: "", answer: "" };

const QUESTION_TYPES = {
  INPUT: "INPUT",
  BOOLEAN: "BOOLEAN",
  CHECKBOX: "CHECKBOX",
} as const;

const BOOLEAN_OPTIONS = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
] as const;

const SELECT_OPTIONS: { label: string; value: QuestionType }[] = [
  { label: "Input", value: QUESTION_TYPES.INPUT },
  { label: "Boolean", value: QUESTION_TYPES.BOOLEAN },
  { label: "Multiple Choice", value: QUESTION_TYPES.CHECKBOX },
] as const;

const FIELDS = {
  ANSWER: "answer",
  TYPE: "type",
  TEXT: "text",
} as const;

export {
  DEFAULT_QUESTION,
  QUESTION_TYPES,
  BOOLEAN_OPTIONS,
  SELECT_OPTIONS,
  FIELDS,
};
