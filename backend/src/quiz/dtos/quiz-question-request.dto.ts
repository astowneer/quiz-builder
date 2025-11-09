import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { QuizOptionRequestDto } from './quiz-option-request.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';

export class QuizQuestionRequestDto {
  @ApiProperty({
    description: 'Text of the question',
    example: 'What is 2 + 2?',
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Type of question',
    enum: QuestionType,
  })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiPropertyOptional({
    description: 'List of options (required for CHECKBOX or BOOLEAN questions)',
    type: [QuizOptionRequestDto],
  })
  @IsArray()
  @IsOptional()
  options?: QuizOptionRequestDto[];
}
