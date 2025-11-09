import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizCreateRequestDto } from './dtos/quiz-create-request.dto';
import {
  QuizDeleteResponseDto,
  QuizGetAllResponseDto,
  QuizResponseDto,
} from './dtos/index';
import { QuizRepository } from './quiz.repository';

@Injectable()
export class QuizService {
  constructor(private quizRepository: QuizRepository) {}

  async createQuizWithQuestionAndOption(
    payload: QuizCreateRequestDto,
  ): Promise<QuizResponseDto> {
    const quiz = await this.quizRepository.createQuiz(payload);

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
    const quizzes = await this.quizRepository.findAllQuizzes();

    return quizzes.map((question) => ({
      id: question.id,
      title: question.title,
      questionCount: question.questions.length,
    }));
  }

  async getQuizById(id: number): Promise<QuizResponseDto | null> {
    const quiz = await this.quizRepository.findQuizById(id);

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
    const deletedQuiz = await this.quizRepository.deleteQuiz(id);

    return {
      id: deletedQuiz.id,
    };
  }
}
