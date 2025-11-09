import { type QuizQuestionResponseDto, type QuizResponseDto } from './dtos';

class QuizEntity {
  private id: number;
  private title: string;
  private questions: QuizQuestionResponseDto[];

  private constructor({
    id,
    title,
    questions,
  }: {
    id: number;
    title: string;
    questions: QuizQuestionResponseDto[];
  }) {
    this.id = id;
    this.title = title;
    this.questions = questions;
  }

  public static initialize({
    id,
    title,
    questions,
  }: {
    id: number;
    title: string;
    questions: QuizQuestionResponseDto[];
  }): QuizEntity {
    return new QuizEntity({
      id,
      title,
      questions,
    });
  }

  public toObject(): {
    id: number;
    title: string;
    questions: QuizQuestionResponseDto[];
  } {
    return {
      id: this.id,
      title: this.title,
      questions: this.questions,
    };
  }

  public toObjectWithRelations(): QuizResponseDto {
    return {
      ...this.toObject(),
      questions: this.questions.map((question) => ({
        id: question.id,
        text: question.text,
        type: question.type,
        answer: question.answer ?? undefined,
        options: question.options.map((option) => ({
          id: option.id,
          text: option.text,
          isCorrect: option.isCorrect,
        })),
      })),
    };
  }
}

export { QuizEntity };
