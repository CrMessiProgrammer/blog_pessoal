import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

// Está criando a tabela
@Entity({name: "tb_postagens"}) // CREATE TABLE tb_postagens
export class Postagem{

    // Está definindo a chave primária e o auto incremento
    @PrimaryGeneratedColumn()   // AUTO_INCREMENT PRIMARY KEY
    id: number;

    // O 'trim()' tira todos os espaços em branco
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do Objeto (titulo tem que estar preenchido)
    // Configura a tabela
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    titulo: string;

    // O 'trim()' tira todos os espaços em branco
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do Objeto ('titulo' tem que estar preenchido)
    // Configura a tabela
    @Column({length: 1000, nullable: false}) // VARCHAR(100) NOT NULL
    texto: string;

    @UpdateDateColumn() // Vai gerar automaticamente a data e hora exata no momento da atualização
    data: Date;

    // Postagem se relaciona com Tema, e o Objeto da outra classe você vai conectar com o Objeto daqui
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE" // Quando apagar o tema, apagar as postagens conectadas com esse tema
    })
    tema: Tema

    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE" // Quando apagar o usuario, apagar as postagens conectadas com esse usuario
    })
    usuario: Usuario;

}