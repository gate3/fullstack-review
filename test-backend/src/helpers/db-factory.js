const sqlLiteObject = require('./db-objects/sqlite-object')
const sqlDatabaseHelper = require('./sql-database.helper')

/**
 * Easily replace the instantiated object below with a new 
 * db helper that has all methods specified in the sqlDatabaseHelper and it continues
 * working without breaking the code. 
 */

const dbObject = new sqlDatabaseHelper(sqlLiteObject)

module.exports = dbObject