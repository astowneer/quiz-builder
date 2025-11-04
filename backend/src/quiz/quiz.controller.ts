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
import { CreateQuizDto } from './dtos/quiz.dto';

@Controller('quizzes')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post()
  async create(@Body() request: CreateQuizDto) {
    return this.quizService.createQuiz(request);
  }

  @Get()
  async findAll() {
    const quizzes = await this.quizService.getAllQuizzes();
    return quizzes.map((q) => ({
      id: q.id,
      title: q.title,
      questionCount: q.questions.length,
    }));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.getQuizById(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.deleteQuiz(id);
  }
}
