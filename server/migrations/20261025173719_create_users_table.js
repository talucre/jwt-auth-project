exports.up = function (knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments('id').primary()
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
        table.boolean('isActivated').defaultTo(false)
        table.string('activationLink')
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user')
}
