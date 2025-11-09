import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QuizCreateRequestDto } from './dtos/quiz-create-request.dto';
import {
  QuizDeleteResponseDto,
  QuizGetAllResponseDto,
  QuizResponseDto,
} from './dtos/index';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async createQuizWithQuestionAndOption(
    payload: QuizCreateRequestDto,
  ): Promise<QuizResponseDto> {
    const quiz = await this.prisma.quiz.create({
      data: {
        title: payload.title,
        questions: {
          create: payload.questions.map((question) => ({
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

    return {
      id: quiz.id,
      title: quiz.title,
      questions: quiz.questions.map((question) => ({
        id: question.id,
        text: question.text,
        type: question.type,
        options: question.options.map((option) => ({
          id: option.id,
          text: option.text,
          isCorrect: option.isCorrect,
        })),
      })),
    };
  }

  async getAllQuizzes(): Promise<QuizGetAllResponseDto[]> {
    const quizzes = await this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        questions: { select: { id: true } },
      },
    });

    return quizzes.map((question) => ({
      id: question.id,
      title: question.title,
      questionCount: question.questions.length,
    }));
  }

  async getQuizById(id: number): Promise<QuizResponseDto | null> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: { include: { options: true } } },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return {
      id: quiz.id,
      title: quiz.title,
      questions: quiz.questions.map((question) => ({
        id: question.id,
        text: question.text,
        type: question.type,
        options: question.options.map((option) => ({
          id: option.id,
          text: option.text,
          isCorrect: option.isCorrect,
        })),
      })),
    };
  }

  async deleteQuiz(id: number): Promise<QuizDeleteResponseDto> {
    const deletedQuiz = await this.prisma.$transaction(async (tx) => {
      await tx.option.deleteMany({
        where: { question: { quizId: id } },
      });

      await tx.question.deleteMany({
        where: { quizId: id },
      });

      return tx.quiz.delete({
        where: { id },
      });
    });

    return {
      id: deletedQuiz.id,
    };
  }
}
