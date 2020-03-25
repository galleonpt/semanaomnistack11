const connection = require("../database/connection")

module.exports = {
  async index(request, response) {
    const { //pagiunacao dos casos
      page = 1
    } = request.query

    //contar o numero de elementos na tabela
    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
      .join("ongs", "ongs.id", "=", "incidents.ong_id") //ir a tabela das ongs e buscar os dados da que tem o id iguao ao que ta na ong do incidente para mandar para o frontend
      .limit(5) //limitar o numero de incidentes or pagina
      .offset((page - 1) * 5) //pular 5 em 5 incidentes para cada pagina. page1 5 page2 5+5
      .select(["incidents.*", //pegar em tudo da tabela dos incidentes
        //ir a tabela da ong e trazer estes dados. tem que ser assim para nao haver sobreposicao de ids visto que nas tabelas as ongs e incidents tem o mesmo nome para o id
        "ongs.name",
        "ongs.email",
        "ongs.number",
        "ongs.city",
        "ongs.district",
      ])

    //buscar o numero de elementos na tabela pelo cabecalho da resposta
    //X-..->nome que demos(default)
    //count-> variavel que vai guardar o numero de elementos a partir daquela propriedade
    response.header('X-Total-Count', count['count(*)'])

    return response.json(incidents);
  },

  async create(request, response) {
    const {
      title,
      description,
      value
    } = request.body;

    const ong_id = request.headers.authorization;

    //como e so um registo ele retorna um array com 1 posicao
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    })
    return response.json({
      id
    })
  },

  async delete(request, response) {
    const {
      id
    } = request.params; //pegar o id que vem nos parametros da rota

    //e necessario o id da ong para ver se o incidente que vai ser deletado foi criado por aquela ong
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select("ong_id") //so a coluna ong_id
      .first() //como e so 1. em vez de retornar um array retorna so o resultado

    if (incident.ong_id != ong_id) {
      return response.status(401).json({ //401->erro de nao autorizacao
        error: "operation not permitted"
      })
    }

    //se correr tudo bem, apagar do banco de dados
    await connection('incidents').where("id", id).delete();

    return (response.status(204).send()) //codigo para qnd enviamos uma mensagem vazia para o frontend
  }
}