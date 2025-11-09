import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class QuizOptionRequestDto {
  @ApiProperty({
    description: 'Quiz option text',
    example: 'Option A',
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'is correct',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;
}
