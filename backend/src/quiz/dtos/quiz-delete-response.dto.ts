import { ApiProperty } from '@nestjs/swagger';

export class QuizDeleteResponseDto {
  @ApiProperty({ example: 1, description: 'ID of the deleted quiz' })
  id: number;
}
