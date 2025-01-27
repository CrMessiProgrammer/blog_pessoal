import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes do Módulo Postagem (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let temaId: any;
  let postagemId: any;
  let app: INestApplication;

  beforeAll(async () => {
    // 'moduleFixture' faz uma copia do projeto, e faz o ambiente de teste
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it("01 - Deve Cadastrar um Novo Usuário", async () => {
      const resposta = await request(app.getHttpServer())
        .post('/usuarios/cadastrar')
        .send({
          nome: 'Root',
          usuario: 'root@root.com',
          senha: 'rootroot',
          foto: '-',
        })
        .expect(201)
  
        // Armazena esse 'Id' para ter disponível para os testes CRUD mais a frente
        usuarioId = resposta.body.id;
  
  });

  it("02 - Deve Autenticar o Usuário (Login)", async () => {
      const resposta = await request(app.getHttpServer())
      .post("/usuarios/logar")
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot',
      })
      .expect(200)
  
      // Por se tratar do 'login' precisa devolver o token
      token = resposta.body.token;
  
  })

  it("03 - Deve Cadastrar um Novo Tema", async () => {
      const resposta = await request(app.getHttpServer())
        .post('/temas')
        .set('Authorization', `${token}`) // Autorizando acesso à esse método
        .send({
          titulo: 'Tema 01',
          descricao: 'Texto do Tema 01',
        })
        .expect(201)
  
        // Armazena esse 'Id' para ter disponível para os testes CRUD mais a frente
        temaId = resposta.body.id;
  
  });

  it("04 - Deve Cadastrar uma Nova Postagem", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/postagens')
      .set('Authorization', `${token}`)
      .send({
        titulo: "Postagem 01",
        texto: "Texto da Postagem 01",
        tema: {
            id: 1
        },
        usuario: {
            id: 1
        }
      })
      .expect(201)

      // Armazena esse 'Id' para ter disponível para os testes CRUD mais a frente
      postagemId = resposta.body.id;

  });

  it("05 - Deve Listar todas as Postagens", async () => {
    return request(app.getHttpServer())
    .get('/postagens')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

  it("06 - Deve Listar a Postagem pelo ID", async () => {
    return request(app.getHttpServer())
    .get('/postagens/1')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

  it("07 - Não Deve Listar um ID de Postagem Não Encontrada", async () => {
    return request(app.getHttpServer())
    .get('/postagens/2')
    .set('Authorization', `${token}`)
    .send({})
    .expect(404)
  })

  it("08 - Deve Listar a Postagem pelo Título", async () => {
    return request(app.getHttpServer())
    .get('/postagens/titulo/Postagem01')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

  it("09 - Deve Atualizar uma Postagem", async () => {
    return request(app.getHttpServer())
    .put('/postagens')
    .set('Authorization', `${token}`)
    .send({
      id: postagemId,
      titulo: "Postagem 01 - Atualizado",
      texto: "Texto da Postagem 01",
      tema: {
        id: 1
        },
      usuario: {
        id: 1
      }
    })
    // O que espero receber (retornar), segundo 'status code' do HTTP
    .expect(200)
    .then( resposta => {
      expect("Postagem 01 - Atualizado").toEqual(resposta.body.titulo);
    })

  })

  it("10 - Deve Deletar a Postagem pelo ID", async () => {
    return request(app.getHttpServer())
    .delete('/temas/1')
    .set('Authorization', `${token}`)
    .send({})
    .expect(204)
  })

});