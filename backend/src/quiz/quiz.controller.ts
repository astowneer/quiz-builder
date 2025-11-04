import { Controller, Post, Body, Get } from '@nestjs/common';
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
}
