import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from './../entities/usuariologin.entity';

@Controller("/usuarios")
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)  // Este é o método de login
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    // 'any' porque não tem um tipo específico
    async login(@Body() usuario: UsuarioLogin): Promise<any> {
        return this.authService.login(usuario);
    }

}