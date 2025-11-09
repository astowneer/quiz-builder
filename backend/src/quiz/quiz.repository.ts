import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QuizCreateRequestDto, QuizDeleteResponseDto } from './dtos';
import { QuizEntity } from './quiz.entity';

@Injectable()
export class QuizRepository {
  constructor(private prisma: PrismaService) {}

  async createQuiz(entity: QuizCreateRequestDto): Promise<QuizEntity> {
    const quiz = await this.prisma.quiz.create({
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

    return QuizEntity.initialize(quiz);
  }

  async findQuizById(id: number): Promise<QuizEntity | null> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: { include: { options: true } } },
    });

    return quiz ? QuizEntity.initialize(quiz) : null;
  }

  async deleteQuiz(id: number): Promise<QuizDeleteResponseDto> {
    return await this.prisma.$transaction(async (trx) => {
      await trx.option.deleteMany({ where: { question: { quizId: id } } });
      await trx.question.deleteMany({ where: { quizId: id } });
      return trx.quiz.delete({ where: { id } });
    });
  }

  async findAllQuizzes() {
    return await this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        questions: { select: { id: true } },
      },
    });
  }
}
