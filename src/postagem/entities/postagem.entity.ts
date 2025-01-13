import { IsNotEmpty, isNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// Está criando a tabela
@Entity({name: "tb_postagens"}) // CREATE TABLE tb_postagens
export class Postagem{


    // Está definindo a chave primária e o auto incremento
    @PrimaryGeneratedColumn()   // AUTO_INCREMENT PRIMARY KEY
    id: number;

    @IsNotEmpty() // Validação dos dados do Objeto (titulo tem que estar preenchido)
    // Configura a tabela
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    titulo: string;

    @IsNotEmpty() // Validação dos dados do Objeto (titulo tem que estar preenchido)
    // Configura a tabela
    @Column({length: 1000, nullable: false}) // VARCHAR(100) NOT NULL
    texto: string;

    @UpdateDateColumn() // Vai gerar automaticamente a data e hora na atualização
    data: Date;


}