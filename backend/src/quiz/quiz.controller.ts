import { Controller, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dtos/quiz.dto';

@Controller('quizzes')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post()
  async create(@Body() request: CreateQuizDto) {
    return this.quizService.createQuiz(request);
  }
}
