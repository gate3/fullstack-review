const path = require('path')

const config = {
  client: 'sqlite3',
  migrations: {
    directory: '../src/models/'
  },
  connection: {
    filename: path.resolve(__dirname, '../db.sqlite'),
  },
  useNullAsDefault: true,
}

module.exports = {
  development: config,
  staging: config,
  production: config
}
  