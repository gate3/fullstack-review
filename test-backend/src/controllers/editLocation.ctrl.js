module.exports = async (db, id, data = {}) => {
    const validFields = [
        'latitude', 
        'longitude', 
        'location_name',
        'place_id', 
        'route', 
        'country', 
        'address'
    ]

    if(id == null || isNaN(id)) throw new Error('Please provide a valid id.')

    let fieldExists = false

    Object.keys(data).forEach(f=>{
        if(validFields.findIndex(v=>v === f) === -1){
            throw new Error(`Invalid field ${f} provided.`)
        }
        fieldExists = (data[f] != null)
    })

    if(!fieldExists) throw new Error('Please provide fields to edit')

    const locationExists = await db.fetchWhere({id})

    if(locationExists.length < 1) throw new Error('Invalid location provided.')

    await db.edit({id: parseInt(id, 10)}, data)
    
    return Object.assign(locationExists[0], data)
}