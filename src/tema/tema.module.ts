import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tema } from "./entities/tema.entity";
import { TemaService } from "./services/tema.service";
import { TemaController } from "./controllers/tema.controller";

// Sub-modulo, vamos colocar tudo que o app.module precisa funcionar

@Module({
    imports: [TypeOrmModule.forFeature([Tema])], // Modelo (formato) da tabela
    controllers: [TemaController], // Define como serão as requisições (GET)
    providers: [TemaService], // Define como serão as ações do banco de dados
    exports: [TypeOrmModule],   // Permite o recurso para todos os locais (fora do Module)
})
export class TemaModule{}