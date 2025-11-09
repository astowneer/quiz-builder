import { QuizQuestionResponseDto } from "./quiz-qestion-response-dto";

export interface QuizResponseDto {
  title: string;
  questions: QuizQuestionResponseDto[];
}
