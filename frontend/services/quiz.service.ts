import { ApiPath, ContentType, HttpMethods } from "../common/common";
import type { Http } from "./http.service";

type QuizGetAllResponseDto = {
  id: number;
  title: string;
  questionCount: number;
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

  public getAllQuizzes(): Promise<QuizGetAllResponseDto[]> {
    return this.http.load(this.getUrl(), {
      method: HttpMethods.GET,
      contentType: ContentType.JSON,
    });
  }

  private getUrl(path = ""): string {
    return `${this.baseUrl}/${this.basePath}/${path}`;
  }
}

export { Quiz };
