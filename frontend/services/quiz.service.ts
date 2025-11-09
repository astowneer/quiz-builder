import { QuizDto } from "@/components/quiz/libs/types/types";
import { ApiPath, ContentType, HttpMethods } from "../common/common";
import type { Http } from "./http.service";

interface QuizGetAllResponseDto {
  id: number;
  title: string;
  questionCount: number;
};

type QuestionType = "CHECKBOX" | "BOOLEAN" | "INPUT";

interface CheckboxOption {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  type: QuestionType;
  text: string;
  options?: CheckboxOption[];
  answer?: string;
}

interface QuizResponseDto {
  id: number;
  title: string;
  questions: QuizQuestion[];
}

interface QuizDeleteResponseDto {
  id: number;
};

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Quiz {
  private http: Http;

  private baseUrl: string;

  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.basePath = ApiPath.QUIZZES;
    this.http = http;
  }

  public getAll(): Promise<QuizGetAllResponseDto[]> {
    return this.http.load(this.getUrl(), {
      method: HttpMethods.GET,
      contentType: ContentType.JSON,
    });
  }

  public getOne(id: number): Promise<QuizResponseDto> {
    return this.http.load(this.getUrl(`${id}`), {
      method: HttpMethods.GET,
      contentType: ContentType.JSON,
    });
  }

  public delete(id: number): Promise<QuizDeleteResponseDto> {
    return this.http.load(this.getUrl(`${id}`), {
      method: HttpMethods.DELETE,
      contentType: ContentType.JSON,
    });
  }

  public create(payload: QuizDto): Promise<QuizDto> {
    return this.http.load(this.getUrl(), {
      method: HttpMethods.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }

  private getUrl(path = ""): string {
    return `${this.baseUrl}/${this.basePath}/${path}`;
  }
}

export { Quiz };
