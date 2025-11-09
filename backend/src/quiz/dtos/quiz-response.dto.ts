import { ApiProperty } from '@nestjs/swagger';
import { QuizQuestionResponseDto } from './quiz-question-response.dto';

export class QuizResponseDto {
  @ApiProperty({ example: 1, description: 'Quiz ID' })
  id: number;

  @ApiProperty({ example: 'Math Quiz', description: 'Quiz title' })
  title: string;

  @ApiProperty({
    type: [QuizQuestionResponseDto],
    description: 'List of quiz questions',
  })
  questions: QuizQuestionResponseDto[];
}
