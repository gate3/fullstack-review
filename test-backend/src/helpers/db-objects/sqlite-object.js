const knex = require('knex')
const config = require('../../../config/db.config')

const envConfig = config[process.env.NODE_ENV]

module.exports = knex(envConfig)
