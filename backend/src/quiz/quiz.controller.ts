import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizCreateRequestDto } from './dtos/quiz-create-request.dto';
import {
  QuizDeleteResponseDto,
  QuizGetAllResponseDto,
  QuizResponseDto,
} from './dtos/index';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth.public')
@Controller('quizzes')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post()
  @ApiOperation({
    summary: 'Crete quiz',
    description: 'Create quiz with question and options',
  })
  @ApiResponse({
    status: 201,
    description: 'Quiz successfully created',
    type: QuizResponseDto,
  })
  async createQuizWithQuestionAndOption(
    @Body() request: QuizCreateRequestDto,
  ): Promise<QuizResponseDto> {
    return this.quizService.createQuizWithQuestionAndOption(request);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all quizzes',
    description:
      'Return a list of all quizzes with titles and number of questions',
  })
  @ApiResponse({
    status: 200,
    description: 'Quiz retrieved successfully',
    type: QuizGetAllResponseDto,
    isArray: true,
  })
  async findAll(): Promise<QuizGetAllResponseDto[]> {
    return await this.quizService.getAllQuizzes();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find quiz by id',
    description: 'Return full details of a quiz including all questions',
  })
  @ApiResponse({
    status: 200,
    description: 'Quiz found successfully',
    type: QuizResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Quiz not found',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<QuizResponseDto | null> {
    return this.quizService.getQuizById(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete quiz by id',
    description: 'Delete a quiz',
  })
  @ApiResponse({
    status: 200,
    description: 'Quiz deleted successfully',
    type: QuizDeleteResponseDto,
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<QuizDeleteResponseDto> {
    return this.quizService.deleteQuiz(id);
  }
}
