import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const allowedOrigins: (string | RegExp)[] = [];

  allowedOrigins.push('https://localhost:3000/');
  allowedOrigins.push('https://mastermind-olive.vercel.app/');

  // if (process.env.NODE_ENV === 'development') {
  //   allowedOrigins.push('https://localhost.clay3d.io');
  //   allowedOrigins.push('https://api.localhost.clay3d.io');
  // } else {
  //   allowedOrigins.push('https://clay3d.io');
  //   allowedOrigins.push('https://www.clay3d.io');
  //   allowedOrigins.push(/clay3d\.vercel\.app$/);
  // }

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 3600,
  });
}
bootstrap();
