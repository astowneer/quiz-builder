import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizCreateRequestDto } from './dtos/quiz-create-request.dto';
import {
  QuizDeleteResponseDto,
  QuizGetAllResponseDto,
  QuizResponseDto,
} from './dtos/index';

@Controller('quizzes')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post()
  async createQuizWithQuestionAndOption(
    @Body() request: QuizCreateRequestDto,
  ): Promise<QuizResponseDto> {
    return this.quizService.createQuizWithQuestionAndOption(request);
  }

  @Get()
  async findAll(): Promise<QuizGetAllResponseDto[]> {
    return await this.quizService.getAllQuizzes();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<QuizResponseDto | null> {
    return this.quizService.getQuizById(id);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<QuizDeleteResponseDto> {
    return this.quizService.deleteQuiz(id);
  }
}
