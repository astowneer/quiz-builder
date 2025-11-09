import { QuizQuestionResponseDto } from "./quiz-question-response.dto";

export class QuizResponseDto {
  id: number;
  title: string;
  questions: QuizQuestionResponseDto[];
}
