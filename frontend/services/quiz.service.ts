import { ApiPath, ContentType, HttpMethods } from "../common";
import type { Http } from "./http.service";
import { QuizResponseDto,QuizDeleteResponseDto, QuizGetAllResponseDto } from "@/common/types/quiz";

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

  public create(payload: QuizResponseDto): Promise<QuizResponseDto> {
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
