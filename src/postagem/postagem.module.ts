import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemController } from "./controllers/postagem.controller";
import { PostagemService } from "./services/postagem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem])], // Cria uma tabela como base na 
    controllers: [PostagemController],
    providers: [PostagemService],
    exports: [TypeOrmModule],   // Deixa a disponível essas informações para todos os locais (para fora do Module)
})
export class PostagemModule{}