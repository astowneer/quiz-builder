import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QuizCreateRequestDto } from './dtos';

@Injectable()
export class QuizRepository {
  constructor(private prisma: PrismaService) {}

  createQuiz(entity: QuizCreateRequestDto) {
    return this.prisma.quiz.create({
      data: {
        title: entity.title,
        questions: {
          create: entity.questions.map((question) => ({
            text: question.text,
            type: question.type,
            options: question.options
              ? { create: question.options }
              : undefined,
          })),
        },
      },
      include: { questions: { include: { options: true } } },
    });
  }

  findQuizById(id: number) {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: { include: { options: true } } },
    });
  }

  deleteQuiz(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.option.deleteMany({ where: { question: { quizId: id } } });
      await tx.question.deleteMany({ where: { quizId: id } });
      return tx.quiz.delete({ where: { id } });
    });
  }

  findAllQuizzes() {
    return this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        questions: { select: { id: true } },
      },
    });
  }
}
