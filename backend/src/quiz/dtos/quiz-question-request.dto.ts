import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { QuizOptionRequestDto } from './quiz-option-request.dto';

export enum QuestionType {
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT',
  CHECKBOX = 'CHECKBOX',
}

export class QuizQuestionRequestDto {
  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  @IsOptional()
  options?: QuizOptionRequestDto[];
}
