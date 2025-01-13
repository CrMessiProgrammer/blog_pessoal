import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitando globalmente a validação de dados
  app.useGlobalPipes(new ValidationPipe());

  // Habilitando CORS na aplicação -> aceita requisições de qualquer lugar (servidor)
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000); // Verifica se tem uma confiuração de porta, se não tem, usa a 4000
}
bootstrap();
