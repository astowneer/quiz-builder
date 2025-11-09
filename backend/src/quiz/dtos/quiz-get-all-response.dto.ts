import { ApiProperty } from "@nestjs/swagger";

export class QuizGetAllResponseDto {
  @ApiProperty({ example: 1, description: 'Quiz ID' })
  id: number;

  @ApiProperty({ example: 'Math Quiz', description: 'Quiz title' })
  title: string;

  @ApiProperty({ example: 5, description: 'Number of questions in the quiz' })
  questionCount: number;
}
