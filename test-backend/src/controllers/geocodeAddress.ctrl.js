module.exports = async (mapHelper, address) => {
    try{
        const coords = await mapHelper.geocode(address)
        
        if(coords.json && coords.json.results){
            const gcode = coords.json.results[0]
            
            const cdRes = {
                address: gcode.formatted_address,
                latitude: gcode.geometry.location.lat,
                longitude: gcode.geometry.location.lng,
                place_id: gcode.place_id,
                location_name: address
            }
            
            for(let g of gcode.address_components){
                cdRes[g.types[0]] = g.long_name
            }
            return cdRes
        }
        throw new Error('Could not geocode supplied address')
    }catch(e){
        if(e.json != null){
            /* 
                Handle the different possible errors here. For google maps the error
                is usually in e.error_message. We don't want to expose certain messages
                to the client so we use a more generic message. Then we log the real message to our own logs
            */
            throw new Error('Error occurred getting data from the location provider.')
        }
    }
}