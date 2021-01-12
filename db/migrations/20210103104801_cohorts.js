exports.up = function(knex) {
    return knex.schema.createTable('cohorts', table => {
        table.increments('id');
        table.string('members');
        table.string('name');
        table.string('logo_url');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('cohorts');
};
