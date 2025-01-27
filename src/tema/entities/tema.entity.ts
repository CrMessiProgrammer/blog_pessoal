import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

// Está criando a tabela
@Entity({name: "tb_temas"}) // CREATE TABLE tb_temas
export class Tema{

    @PrimaryGeneratedColumn()   // AUTO_INCREMENT PRIMARY KEY
    @ApiProperty()
    id: number;

    // O 'trim()' tira todos os espaços em branco
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // Validação dos dados do Objeto (titulo tem que estar preenchido)
    @Column({length: 255, nullable: false}) // VARCHAR(100) NOT NULL
    @ApiProperty()
    descricao: string;

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]; // Esse array servirá somente para mostrar as postagens dentro dele

}