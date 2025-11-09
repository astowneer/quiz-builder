import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuizModule } from './quiz/quiz.module';
import { PrismaModule } from '../prisma/prisma.module';
import config from './config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
    QuizModule,
  ],
})
export class AppModule {}
