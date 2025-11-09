import { IsBoolean, IsOptional, IsString } from "class-validator";

export class QuizOptionRequestDto {
  @IsString()
  text: string;

  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;
}
