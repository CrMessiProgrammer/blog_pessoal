import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';


@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService, // Válida os dados 
        private jwtService: JwtService, // Gera o token
        private bcrypt: Bcrypt  // Válida a senha do Usuário
    ){ }

    // Método abstrato da classe de autenticação local
    async validateUser(username: string, password: string): Promise<any>{

        // Verifica se o Usuario existe
        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        // Se não achar, exibe uma coisa
        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha)

        // Se Usuario e Senha válido, devolta 'resposta'
        if(buscaUsuario && matchPassword){
            // '...resposta' retorna tudo de Usuario, exceto Senha (desestruturação com Rest Operation)
            const { senha, ...resposta } = buscaUsuario
            return resposta
        }

        // Retorna a mensagem '401 (Acesso Negado)'
        return null

    }

    // Gerar o token
    async login(usuarioLogin: UsuarioLogin){

        const payload = { sub: usuarioLogin.usuario }

        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)

        return{
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: usuarioLogin.usuario,
            senha: '',  // Deixa a senha vazia
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`, // Constroi o token
        }

    }
}