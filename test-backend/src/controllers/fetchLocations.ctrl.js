module.exports = db => {
    if(db == null) throw new Error('Error occurred fetching locations')
    return db.fetchAll({field: 'updated_at', direction: 'desc'})
}
