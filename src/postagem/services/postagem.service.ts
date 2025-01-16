import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";

// postagem.service -> mostra quais serviços vai ter

@Injectable() // Representa que será uma classe de serviço, e que pode injetar o código em qualquer serviço
export class PostagemService{

    // '@InjectRepository' criar as instruções SQL com base na entidade que eu passei, nesse caso 'Postagem'
    constructor(@InjectRepository(Postagem) // Injeção de independência (vai usar todos os métodos usando essa entidade) - já cria o Repository
    private postagemRepository: Repository<Postagem>,
    private temaService: TemaService
    ){}

    // Procura trazer todos os dados da tabela tb_postagens (enquanto a aplicação está rodando, outras coisas ficam executando em segundo plano)
    async findAll(): Promise<Postagem[]>{ // Promise tem 3 estados: pendente, finalizado, rejeitado
        return this.postagemRepository.find({   // SELECT * FROM tb_postagens;
            relations: {    // Habilita o relacionamento na conculta (INNER JOIN)
                tema: true  // Qual entidade queremos relacionar na consulta
            }
        });
    }

    async findById(id: number): Promise<Postagem> {

        // É necessário o 'await' para esperar receber um dado
        // Usado como validação
        // SELECT * FROM tb_postagens WHERE id = ?;
        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations: {    // Habilita o relacionamento na conculta (INNER JOIN)
                tema: true  // Qual entidade queremos relacionar na consulta
            }
        });

        if (!postagem) {
            // Se não existir postagem, retornará essa mensagem
            // throw para a execução após sua execução
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);            
        }
        // Caso exista postagem, irá retornar
        return postagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]>{ // Promise tem 3 estados: pendente, finalizado, rejeitado
        return this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)    // ILike procura por caracteres especificos
            },
            relations: {    // Habilita o relacionamento na conculta (INNER JOIN)
                tema: true  // Qual entidade queremos relacionar na consulta
            }
        }) // SELECT * FROM tb_postagens;
    }

    // Criando/inserindo informações
    async create(postagem: Postagem): Promise<Postagem>{

        // Vai fazer uma busca
        await this.temaService.findById(postagem.tema.id) // valida o tema

        // INSERT INTO tb_postagens (titulo, texto) VALUES (?, ?)
        // o await serve para ele aguardar uma informação em segundo plano
        return await this.postagemRepository.save(postagem);
    }

    // Criando/inserindo informações
    async update(postagem: Postagem): Promise<Postagem>{

        // findById verificará se o Id atualiazado existe
        await this.findById(postagem.id);   // Valida a postagem

        //
        await this.temaService.findById(postagem.tema.id) // valida o tema

        // UPDATE tb_postagens SET titulo = postagem.titulo,
        // texto = postagem.texto, data = CURRENT_TIMESTAMP()
        // WHERE id = postagem.id
        // o await serve para ele aguardar uma informação em segundo plano
        return await this.postagemRepository.save(postagem);
    }

    // DeleteResult sinaliza que o delete foi executado
    async delete(id: number): Promise<DeleteResult>{

        // Verifica se o Id que quer deletar existe
        await this.findById(id)

        // DELETE tb_postagens WHERE id = ?;
        return await this.postagemRepository.delete(id);
    }

}