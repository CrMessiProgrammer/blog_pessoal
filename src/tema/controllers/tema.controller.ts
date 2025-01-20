import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

// Protege de forma global (todos os métodos classe)
@UseGuards(JwtAuthGuard)   // Protege essa requisitação (somente alguns Usuarios terá acesso)
@Controller("/temas") // Endereço do endpoint
export class TemaController{
    
    constructor(
        // 'readonly' porque é apenas para visualização
        private readonly temaService: TemaService
    ){}

    @Get() // Método de Consulta
    @HttpCode(HttpStatus.OK)    // Se o método trouxe alguma coisa, retorna 'OK'
    findAll(): Promise<Tema[]>{
        return this.temaService.findAll();
    }

    @Get('/:id') // Colocando a variável 
    @HttpCode(HttpStatus.OK)    // Se o método trouxe alguma coisa, retorna 'OK'
    // Vai pegar a variável id e converter para número
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema>{
        return this.temaService.findById(id);
    }

    // o primeiro '/titulo' é para acessar o endereço de endpoint, já o '/:titulo' busca um dado específico de titulo
    @Get('/descricao/:descricao') // Colocando a variável 
    @HttpCode(HttpStatus.OK)    // Se o método trouxe alguma coisa, retorna 'OK'
    // Vai pegar a variável titulo e converter para número
    findByDescricao(@Param('descricao') descricao: string): Promise<Tema[]>{
        return this.temaService.findByDescricao(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)    // Se o método trouxe alguma coisa, retorna 'CREATED'
    // Pega esse objeto no corpo da requisição, por isso o '@Body'
    create(@Body() tema: Tema): Promise<Tema>{
        return this.temaService.create(tema);
    }

    @Put()
    @HttpCode(HttpStatus.OK)    // Se o método trouxe alguma coisa, retorna 'OK'
    // Pega esse objeto no corpo da requisição, por isso o '@Body'
    update(@Body() tema: Tema): Promise<Tema>{
        return this.temaService.update(tema);
    }

    @Delete('/:id') // Colocando a variável 
    @HttpCode(HttpStatus.NO_CONTENT)    // O conteúdo não existe mais, confirmando que foi excluído
    // Vai pegar a variável id e converter para número
    delete(@Param('id', ParseIntPipe) id: number){
        return this.temaService.delete(id);
    }
    
}