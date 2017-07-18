
exports.up = function(knex, Promise) {
  return knex.schema.createTable('portfolios', table => {
    table.increments()
    table.text("url")
    table.text("user_id")
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('portfolios')
}
