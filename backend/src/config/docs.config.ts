import { registerAs } from '@nestjs/config';

export default registerAs('docs', () => ({
  title: process.env.SWAGGER_TITLE ?? 'Quiz Builder',
  description:
    process.env.SWAGGER_DESCRIPTION ?? 'Quiz Builder API description',
  version: process.env.SWAGGER_VERSION ?? '1.0',
  tag: process.env.SWAGGER_TAG ?? 'quiz-builder',
}));
