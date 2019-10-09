module.exports = async (db, id) => {
    if(id == null || isNaN(id)) throw new Error('Please supply a valid location id')
    await db.delete({id})
    return 'Location Deleted Successfully'
}