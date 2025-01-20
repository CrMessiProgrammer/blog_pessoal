import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants/constants";

@Injectable()
// Strategy de Jwt usar "passport-jwt"
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            // Procura o to
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,    // Não ignora o tempo de expiração do token
            secretOrKey: jwtConstants.secret,   // Puxa a 'secret' para validar o token
        });
    }

    // Sem validação específica, apenas recebe e retorna
    async validate(payload: any){
        return payload;
    }
}