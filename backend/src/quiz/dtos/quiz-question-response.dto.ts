import { QuestionType } from 'generated/prisma';
import { QuizOptionResponseDto } from './quiz-option-response.dto';

export class QuizQuestionResponseDto {
  id: number;
  text: string;
  type: QuestionType;
  options: QuizOptionResponseDto[];
}
