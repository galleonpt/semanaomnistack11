const knex = require("knex");
//configuracoes da base de dados
const configuration = require("../../knexfile");

//criar conexao de desenvolvimento
const connection = knex(configuration.development);

module.exports = connection;