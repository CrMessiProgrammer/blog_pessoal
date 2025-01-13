import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';

// Função especial original do Type, está indicando que é uma classe Module
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal', // Nome do banco de dados
      entities: [Postagem], // Cria as tabelas dentro do banco de dados
      synchronize: true,  // Verifica se teve alteração na module, atualizando caso tenha
      logging: true,  // Mostra no console os comandos SQL gerados no Type ORM
    }),
    PostagemModule,
  ],
  controllers: [],   // Controladoras 
  providers: [],  // Registra as classes de serviço
})
export class AppModule {}
