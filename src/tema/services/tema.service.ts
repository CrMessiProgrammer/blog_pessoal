import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

// tema.service -> mostra quais serviços vai ter

@Injectable() // Representa que será uma classe de serviço, e que pode injetar o código em qualquer serviço
export class TemaService{

    // '@InjectRepository' cria as instruções SQL com base na entidade que eu passei, nesse caso 'Tema'
    constructor(@InjectRepository(Tema) // Injeção de independência (vai usar todos os métodos usando essa entidade) - já cria o Repository
    private temaRepository: Repository<Tema>
    ){}

    // Procura trazer todos os dados da tabela tb_temas (enquanto a aplicação está rodando, outras coisas ficam executando em segundo plano)
    async findAll(): Promise<Tema[]>{ // Promise tem 3 estados: pendente, finalizado, rejeitado
        return await this.temaRepository.find({ // SELECT * FROM tb_temas;
            relations: {
                postagem: true
            }
        });
    }

    async findById(id: number): Promise<Tema> {

        // É necessário o 'await' para esperar receber um dado
        // Usado como validação
        // SELECT * FROM tb_temas WHERE id = ?;
        const tema = await this.temaRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if (!tema) {
            // Se não existir tema, retornará essa mensagem
            // throw para a execução após sua execução
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);            
        }
        // Caso exista tema, irá retornar
        return tema;
    }

    async findByDescricao(descricao: string): Promise<Tema[]>{ // Promise tem 3 estados: pendente, finalizado, rejeitado
        return await this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)    // ILike procura por caracteres especificos
            },
            relations: {
                postagem: true
            }
        }) // SELECT * FROM tb_temas;
    }

    // Criando/inserindo informações
    async create(Tema: Tema): Promise<Tema>{

        // INSERT INTO tb_postagens (titulo, texto) VALUES (?, ?)
        // o await serve para ele aguardar uma informação em segundo plano
        return await this.temaRepository.save(Tema);
    }

    // Criando/inserindo informações
    async update(tema: Tema): Promise<Tema>{

        // findById verificará se o Id atualiazado existe
        await this.findById(tema.id);

        // UPDATE tb_temas SET descricao = tema.descricao,
        // WHERE id = tema.id
        // o await serve para ele aguardar uma informação em segundo plano
        return await this.temaRepository.save(tema);
    }

    // DeleteResult sinaliza que o delete foi executado
    async delete(id: number): Promise<DeleteResult>{

        // Verifica se o Id que quer deletar existe
        await this.findById(id)

        // DELETE tb_temas WHERE id = ?;
        return await this.temaRepository.delete(id)
    }

}