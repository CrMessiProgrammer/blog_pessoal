import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    // Para poder criar a tabela
    imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],   // 'forwardRef' tira o loop infinito
        controllers: [UsuarioController],
        providers: [UsuarioService],
        exports: [UsuarioService],
})
export class UsuarioModule {};