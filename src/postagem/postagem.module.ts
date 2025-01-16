import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemController } from "./controllers/postagem.controller";
import { PostagemService } from "./services/postagem.service";
import { TemaModule } from "../tema/tema.module";
import { TemaService } from "../tema/services/tema.service";

// Sub-modulo, vamos colocar tudo que o app.module precisa funcionar

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule], // Modelo de dados que vai criar uma tabela
    controllers: [PostagemController], // Define como serão as requisições (GET)
    providers: [PostagemService, TemaService], // Define os provedores, como serão as ações do banco de dados (os métodos)
    exports: [TypeOrmModule],   // Permite o acesso desse recurso para todos os locais (para fora do Module)
})
export class PostagemModule{}