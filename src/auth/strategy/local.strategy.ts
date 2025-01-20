import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

// Recebe e manda para a 'auth.service'
@Injectable()
// Strategy de Local usar "passport-local"
export class LocalStrategy extends PassportStrategy(Strategy) {

    // Usados para mais na frente para sobrescrever mais à frente
    private _usernameField: string;
    private _passwordField: string;

    // Sobrescrevendo os dois atributos
    constructor(private readonly authService: AuthService) {
        super(); 
        this._usernameField = 'usuario';
        this._passwordField = 'senha';
    }

    // Reecebe os dados do Usuário, e os valida
    async validate(usuario: string, senha: string): Promise<any> {
        const validaUsuario = await this.authService.validateUser(usuario, senha);
        if (!validaUsuario) {
            throw new UnauthorizedException("Usuário e/ou senha incorretos!");
        }
        return validaUsuario;
    }

}
