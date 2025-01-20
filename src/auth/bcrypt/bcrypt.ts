import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt{

    // Irá criptografar a senha
    async criptografarSenha(senha: string): Promise<string> {

        let saltos: number = 10; // Aplica 10 vezes o Hash
        return await bcrypt.hash(senha, saltos) // 'Hash' está criptografando

    }

    async compararSenhas(senhaDigitada: string, senhaBanco: string): Promise<boolean> {
        return await bcrypt.compare(senhaDigitada, senhaBanco); // 'Compare' aplica o algaritmo e faz a comparação para validação dos dados
    }

}