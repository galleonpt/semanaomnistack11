const crypto = require("crypto");
const connection = require("../database/connection")

module.exports = {
  //listagem de todos os dados da tabela
  async index(req, res) {
    const ongs = await connection("ongs").select("*") //selecionar todos os campos da tabela ongs 

    return res.json(ongs)
  },

  //Registar ong
  //e async pk o insert pode demorar algum tempo entao so avanca so qnd estiver feito o insert
  async create(req, res) {
    const {
      name,
      email,
      number,
      city,
      district
    } = req.body;

    //criar um id aleatorio
    //gera 4 bytes dcaracteres aleatorios, convertendo para string do tipo hexadecimal
    const id = crypto.randomBytes(4).toString("HEX");

    await connection('ongs').insert({
      id,
      name,
      email,
      number,
      city,
      district
    })

    return res.json({
      id
    })
  }
}