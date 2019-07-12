
exports.up = async function(knex) {
  await knex.schema.createTable('users', tbl => {
    tbl.increments('id');
    tbl.string('username').unique().notNullable();
    tbl.string('password').notNullable();
  })
  await knex.schema.createTable('jokes', tbl => {
    tbl.increments('id');
    tbl.string('joke_text').notNullable();
    tbl.boolean('public').notNullable();
    tbl.boolean('private').notNullable();
    tbl.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
  })
  await knex.schema.createTable('keywords', tbl => {
    tbl.increments('id');
    tbl.string('keyword').unique().notNullable();
  });
  await knex.schema.createTable('jokes_keywords', tbl => {
    tbl.increments('id');
    tbl.integer('joke_id').references('id').inTable('jokes').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
    tbl.integer('keyword_id').references('id').inTable('keywords').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('jokes');
  await knex.schema.dropTableIfExists('keywords');
  await knex.schema.dropTableIfExists('jokes_keywords');
};
