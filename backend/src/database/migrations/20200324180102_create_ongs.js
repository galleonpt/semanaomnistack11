//Metodo up e smp responsavel por criar a tabela
exports.up = function (knex) {
  return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary(); //id do tipo string que e chave primaria
    table.string('name').notNullable(); //nao pode ser nulo
    table.string('email').notNullable();
    table.string('number').notNullable();
    table.string('city').notNullable();
    table.string('district').notNullable();

  })
};

//e chamado qnd deu algo errado
exports.down = function (knex) {
  return knex.schema.dropTable("ongs");
};