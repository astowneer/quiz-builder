import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuizModule } from './quiz/quiz.module';
import { PrismaModule } from '../prisma/prisma.module';
import docsConfig from './config/docs.config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [docsConfig],
    }),
    QuizModule,
  ],
})
export class AppModule {}
