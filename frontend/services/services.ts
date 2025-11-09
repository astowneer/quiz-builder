import { Quiz } from "./quiz.service";
import { Http } from "./http.service";

const http = new Http();

const quizService = new Quiz({
  baseUrl: 'http://localhost:3000',
  http,
});

export { quizService };
