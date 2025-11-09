import { ApiProperty } from "@nestjs/swagger";

export class QuizOptionResponseDto {
  @ApiProperty({ example: 1, description: 'Option ID' })
  id: number;

  @ApiProperty({ example: 'Option A', description: 'Text of the option' })
  text: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if this option is correct',
  })
  isCorrect: boolean;
}
