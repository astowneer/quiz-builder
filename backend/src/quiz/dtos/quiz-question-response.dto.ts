import { QuestionType } from '@prisma/client';
import { QuizOptionResponseDto } from './quiz-option-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class QuizQuestionResponseDto {
  @ApiProperty({ example: 1, description: 'Question ID' })
  id: number;

  @ApiProperty({ example: 'Is 2+2=4?', description: 'Question text' })
  text: string;

  @ApiProperty({ enum: QuestionType, description: 'Question type' })
  type: QuestionType;

  @ApiProperty({
    type: [QuizOptionResponseDto],
    description: 'Question options',
  })
  options: QuizOptionResponseDto[];

  @ApiProperty({
    description: 'Question answer',
    example: 'true',
  })
  answer?: string | null;
}
