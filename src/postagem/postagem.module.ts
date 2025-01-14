import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemController } from "./controllers/postagem.controller";
import { PostagemService } from "./services/postagem.service";

// Sub-modulo, vamos colocar tudo que o modulo precisa funcionar

@Module({
    imports: [TypeOrmModule.forFeature([Postagem])], // Modelo de dados que vai criar uma tabela
    controllers: [PostagemController], // Define como serão as requisições (GET)
    providers: [PostagemService], // Define como serão as ações do banco de dados
    exports: [TypeOrmModule],   // Permite o acesso desse recurso para todos os locais (para fora do Module)
})
export class PostagemModule{}