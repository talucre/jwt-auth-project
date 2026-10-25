exports.up = function (knex) {
    return knex.schema.createTable('token', function (table) {
        table.increments('id').primary()
        table.integer('user_id').unsigned().notNullable()
        table
            .foreign('user_id')
            .references('id')
            .inTable('user')
            .onDelete('CASCADE')
        table.string('refreshToken', 500).notNullable()
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('token')
}
