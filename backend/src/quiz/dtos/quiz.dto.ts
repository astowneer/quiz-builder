import {
  IsString,
  IsArray,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export enum QuestionType {
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT',
  CHECKBOX = 'CHECKBOX',
}

export class OptionDto {
  @IsString()
  text: string;

  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;
}

export class QuestionDto {
  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  @IsOptional()
  options?: OptionDto[];
}

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsArray()
  questions: QuestionDto[];
}
