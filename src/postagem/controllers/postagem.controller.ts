import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

// Protege de forma global (todos os métodos classe)
@UseGuards(JwtAuthGuard)   // Protege essa requisitação (somente alguns Usuarios terá acesso)
@Controller("/postagens") // Endereço do endpoint
export class PostagemController{
    
    constructor(
        // 'readonly' porque é apenas para visualização
        private readonly postagemService: PostagemService
    ){}

    @Get() // Método de Consulta
    @HttpCode(HttpStatus.OK)    // Se o método trouxe alguma coisa, retorna 'OK'
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }

    @Get('/:id') // Colocando a variável 
    @HttpCode(HttpStatus.OK)    // Se o método trouxe alguma coisa, retorna 'OK'
    // Vai pegar a variável id e converter para número
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem>{
        return this.postagemService.findById(id);
    }

    // o primeiro '/titulo' é para acessar o endereço de endpoint, já o '/:titulo' busca um dado específico de titulo
    @Get('/titulo/:titulo') // Colocando a variável 
    @HttpCode(HttpStatus.OK)    // Se o método trouxe alguma coisa, retorna 'OK'
    // Vai pegar a variável titulo e converter para número
    findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{
        return this.postagemService.findByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)    // Se o método trouxe alguma coisa, retorna 'CREATED'
    // Pega esse objeto no corpo da requisição, por isso o '@Body'
    create(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)    // Se o método trouxe alguma coisa, retorna 'OK'
    // Pega esse objeto no corpo da requisição, por isso o '@Body'
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.update(postagem);
    }

    @Delete('/:id') // Colocando a variável 
    @HttpCode(HttpStatus.NO_CONTENT)    // O conteúdo não existe mais, confirmando que foi excluído
    // Vai pegar a variável id e converter para número
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id);
    }
    
}