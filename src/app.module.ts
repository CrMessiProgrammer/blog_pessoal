import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

// O app.module defino todos os recursos que terá na aplicação

// Função especial original do Type, está indicando que é uma classe Module
@Module({
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        useClass: ProdService,  // Os testes (e2e) só funcionam com "DevService"
        imports: [ConfigModule],
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],   // Controladoras 
  providers: [],  // Registra as classes de serviço
})
export class AppModule {}
