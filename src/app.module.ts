import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';

// O app.module defino todos os recursos que terá na aplicação

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
      entities: [Postagem, Tema], // Entidades -> Cria tabelas no banco de dados
      synchronize: true,  // Verifica se teve alteração na module, atualizando caso tenha (deixa tudo sincronizado)
      logging: true,  // Mostra no console os comandos SQL gerados no Type ORM
    }),
    PostagemModule,
    TemaModule,
  ],
  controllers: [],   // Controladoras 
  providers: [],  // Registra as classes de serviço
})
export class AppModule {}
