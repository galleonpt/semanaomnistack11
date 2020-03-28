const request = require("supertest")
const app=require("../../src/app")
const connection=require("../../src/database/connection")
describe("ONG", ()=>{
  beforeEach(async ()=>{
    await connection.migrate.rollback()//zerar o banco de bados antes de criar as tabelas para os testes
    await connection.migrate.latest()
  })

  //dps de tudop acontecer isto destroi a coneçao dos testes com a bd para nao ficar nada a correr por tras
  afterAll(async ()=>{
    await connection.destroy()
  })

  it("It should be able to create a new ONG", async()=>{
    const response= await request(app)
      .post("/ongs")
      .send({
        name:"teste dos testes de integracao",
        number: "+351 961323301",
        email:"teste@skajdfb.com",
        city: "Barcelos",
        district: "Braga"
      })

      //espera que no responss.body tenha a propriedade id com tamanho 8
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);

  })
})