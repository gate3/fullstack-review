const {TABLES} = require('../constants/db-constants')

const defaultTable = TABLES.geolocation

const DbHelper = function (dbObject) {
    this.db = dbObject
}

DbHelper.prototype.fetchAll = function(orderBy = null,table = defaultTable) {
    const tb = this.db(table)
    if(orderBy != null) tb.orderBy(orderBy.field, orderBy.direction)
    return tb
}

DbHelper.prototype.fetchById = function(id, table = defaultTable) {
    return this.db(table).where({ id })
}

DbHelper.prototype.fetchWhere = function (query, table=defaultTable) {
    return this.db(table).where(query)
}

DbHelper.prototype.save = function (data, table = defaultTable) {
    return this.db(table).insert(data)
}

DbHelper.prototype.edit = function (query, data, table = defaultTable) {
    return this.db(table).where(query).update(data)
}

DbHelper.prototype.delete = function (query, table = defaultTable) {
    return this.db(table).where(query).del()
}

module.exports = DbHelper