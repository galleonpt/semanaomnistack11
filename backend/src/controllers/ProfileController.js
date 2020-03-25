//Arquivo resonsavel pelos dados de uma ONG especifica
const connection = require("../database/connection")

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    //procurar na tabela incidents tds os registos feitos pela ond com aquele id especifico
    const incidents = await connection('incidents')
      .where("ong_id", ong_id)
      .select("*")

    return response.json(incidents)
  },
}