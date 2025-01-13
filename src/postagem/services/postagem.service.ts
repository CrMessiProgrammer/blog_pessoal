import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { Repository } from "typeorm";

@Injectable() // Representa que será uma classe de serviço, e que pode injetar o código em qualquer serviço
export class PostagemService{

    // '@InjectRepository' criar as instruções SQL com base na entidade que eu passei, nesse caso 'Postagem'
    constructor(@InjectRepository(Postagem) // Injeção de independência (vai usar todos os métodos usando essa entidade) - já cria o Repository
    private postagemRepository: Repository<Postagem>
    ){}

    // Procura trazer todos os dados da tabela tb_postagens (enquanto a aplicação está rodando, outras coisas ficam executando em segundo plano)
    async findAll(): Promise<Postagem[]>{ // Promise tem 3 estados: pendente, finalizado, rejeitado
        return this.postagemRepository.find(); // SELECT * FROM tb_postagens;
    }

}