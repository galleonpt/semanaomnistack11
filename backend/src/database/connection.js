const knex = require("knex");
//configuracoes da base de dados
const configuration = require("../../knexfile");
const config=process.env.NODE_ENV === "test" ? configuration.test : configuration.development

//criar conexao para ambiente de desenvolvimento
const connection = knex(config);

module.exports = connection;