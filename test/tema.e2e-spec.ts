import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes do Módulo Tema (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let temaId: any;
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

  it("04 - Deve Listar Todos os Temas", async () => {
    return request(app.getHttpServer())
    .get('/temas')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

  it("05 - Deve Listar o Tema pelo ID", async () => {
    return request(app.getHttpServer())
    .get('/temas/1')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

  it("06 - Não Deve Listar um ID de Tema Não Encontrado", async () => {
    return request(app.getHttpServer())
    .get('/temas/2')
    .set('Authorization', `${token}`)
    .send({})
    .expect(404)
  })

  it("07 - Deve Listar o Tema pela Descricao", async () => {
    return request(app.getHttpServer())
    .get('/temas/descricao/Tema01')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

  it("08 - Deve Atualizar um Tema", async () => {
    return request(app.getHttpServer())
    .put('/temas')
    .set('Authorization', `${token}`)
    .send({
        id: temaId,
        titulo: 'Tema 01',
        descricao: 'Texto do Tema 01 - Atualizado',
    })
    // O que espero receber (retornar), segundo 'status code' do HTTP
    .expect(200)
    .then( resposta => {
      expect("Texto do Tema 01 - Atualizado").toEqual(resposta.body.descricao);
    })

  })

  it("09 - Deve Deletar o Tema pelo ID", async () => {
    return request(app.getHttpServer())
    .delete('/temas/1')
    .set('Authorization', `${token}`)
    .send({})
    .expect(204)
  })

});