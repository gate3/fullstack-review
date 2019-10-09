const {TABLES} = require('../constants/db-constants')
const tableName = TABLES.geolocation

exports.up = knex =>  (
  knex.schema.createTable(tableName, table => {
    table.increments()
    table.string('latitude').notNullable()
    table.string('longitude').notNullable()
    table.string('place_id').defaultTo('')
    table.string('route').defaultTo('')
    table.string('address').defaultTo('')
    table.string('country').defaultTo('')
    table.string('location_name').defaultTo('')
    table.timestamps(true, true)
  })
)

exports.down = knex => knex.schema.dropTable(tableName)
