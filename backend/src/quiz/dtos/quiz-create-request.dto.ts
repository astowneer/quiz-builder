import { IsString, IsArray } from 'class-validator';
import { QuizQuestionRequestDto } from './quiz-question-request.dto';
import { ApiProperty } from '@nestjs/swagger';

export class QuizCreateRequestDto {
  @ApiProperty({
    description: 'Quiz title',
    format: 'text',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Quiz questions',
    type: [QuizQuestionRequestDto],
  })
  @IsArray()
  questions: QuizQuestionRequestDto[];
}
