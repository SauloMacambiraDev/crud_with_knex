
exports.up = knex => knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.string('email').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at')
});


exports.down = knex => knex.schema.dropTable('users');
