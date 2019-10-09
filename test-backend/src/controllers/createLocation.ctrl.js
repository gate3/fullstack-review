module.exports = async (db, data) => {
    const errorMsg = 'A problem occurred saving location'
    
    if(db == null) throw new Error(errorMsg)

    if(data == null) throw new Error(errorMsg)

    const {
        latitude, 
        longitude, 
        place_id, 
        route, country, 
        address, 
        location_name
    } = data

    const locationExists = await db.fetchWhere({location_name})
    
    if(latitude == null || longitude == null) throw new Error(errorMsg)
    // we log the real error to a remote logger

    if(locationExists.length < 1) {
        await db.save({
            latitude, 
            longitude, 
            place_id, 
            route, 
            country, 
            address,
            location_name
        })
    }else{
        return 'Location exists already'
    }
    return 'Location saved'
}