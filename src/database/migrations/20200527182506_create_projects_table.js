
exports.up = knex => knex.schema.createTable('projects', table => {
    table.increments('id');
    table.string('title').notNullable();
    table.string('description');
    
    // Creating Foreign Key to users table
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE') 

    // Another way of create a foreign key using postgree drive in background
    // table.integer('user_id')
    //     .references('users.id')
    //     .notNullable()
    //     .onDelete('CASCADE')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at')
});


exports.down = knex => knex.schema.dropTable('projects');
