import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { QuizRepository } from './quiz.repository';

@Module({
  controllers: [QuizController],
  providers: [QuizService, PrismaService, QuizRepository],
})
export class QuizModule {}
