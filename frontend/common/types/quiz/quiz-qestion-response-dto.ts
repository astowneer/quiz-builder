import { QuestionType } from "./question.type";
import { QuizOptionReponseDto } from "./quiz-option-response.dto";

export interface QuizQuestionResponseDto {
  type: QuestionType;
  text: string;
  options?: QuizOptionReponseDto[];
  answer?: string;
}
