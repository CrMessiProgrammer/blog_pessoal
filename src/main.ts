import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Projeto Blog Pessoal')
  .setDescription('Projeto Blog Pessoal - Generation Brasil')
  .setContact("Carlos Henrique Nunes","https://www.linkedin.com/in/carlos-henrique-nunes-234005190/","carloshnunes383@gmail.com")
  .setLicense("Generation Brasil", "https://brazil.generation.org/")
  .setExternalDoc("GitHub", "https://github.com/CrMessiProgrammer")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  // Definindo o time zone (fuso horário)
  process.env.TZ = '-03:00';

  // Habilitando globalmente a validação de dados
  app.useGlobalPipes(new ValidationPipe());

  // Habilitando CORS na aplicação -> aceita requisições de qualquer lugar (servidor)
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000); // Verifica se tem uma confiuração de porta, se não tem, usa a 4000
}
bootstrap();
