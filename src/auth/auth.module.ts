import { forwardRef, Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt/bcrypt';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

// Modulo de autenticação
@Module({
    imports: [
        forwardRef(() => UsuarioModule),    // 'forwardRef' tira o loop infinito (já que )
        JwtModule.register({    // 'register' serve para colocar algumas configurações específicas dentro desse import
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'} // Tempo de expirar o token
        })
    ],
    controllers: [AuthController],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    exports: [Bcrypt],
})
export class AuthModule {};