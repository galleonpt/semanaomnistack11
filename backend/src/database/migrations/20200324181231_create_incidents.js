exports.up = function (knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments() //cria um numero que se auto incrementa

    table.string('title').notNullable(); //nao pode ser nulo
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    //criar a chave estrangeira(cada incident é criado por uma ong)
    table.string("ong_id").notNullable();

    //referenciar a chave estrangeira
    //ong_id e a chave estrangeira que referencia o id da tabela ongs
    table.foreign("ong_id").references("id").inTable("ongs");
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("incidents");
};