import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";

@Injectable() // Representa que será uma classe de serviço, e que pode injetar o código em qualquer serviço
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) {}

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {
                postagem: true,
            },
        });
    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if (!usuario) {
            // Se não existir tema, retornará essa mensagem
            // throw para a execução após sua execução
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);            
        }
        // Caso exista tema, irá retornar
        return usuario;
    }

    // Método auxiliar para Validação do Usuário
    async findByUsuario(usuario: string): Promise<Usuario | undefined>{
        return await this.usuarioRepository.findOne({
            where:{
                usuario: usuario
            }
        })
    }

    async create(usuario: Usuario): Promise<Usuario>{

        const buscaUsuario = await this.findByUsuario(usuario.usuario)

        // Verifica se o email (usuario) já existe
        if (buscaUsuario)
            throw new HttpException("O Usuário já existe!", HttpStatus.BAD_REQUEST)

        // Criptografa a senha
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

        // Salva os dados do usuário no banco
        return await this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario>{

        await this.findById(usuario.id);

        // Para buscar pelo Id, e achar exatamente
        const buscaUsuario = await this.findByUsuario(usuario.usuario)

        // Verifica se o email (usuario) já é cadastrado, e se pertence a outro usuario
        // Verifica se o Id é diferente do Id passado
        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException("Usuário (e-mail) já cadastrado!", HttpStatus.BAD_REQUEST)

        // Criptografa a senha
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

        // Salva os dados do usuário no banco
        return await this.usuarioRepository.save(usuario);
    }

}