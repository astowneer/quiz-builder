import { IsString, IsArray } from 'class-validator';
import { QuizQuestionRequestDto } from './quiz-question-request.dto';

export class QuizCreateRequestDto {
  @IsString()
  title: string;

  @IsArray()
  questions: QuizQuestionRequestDto[];
}
