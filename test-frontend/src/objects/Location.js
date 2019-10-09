// Assign null values to all fields in case they don't exist to avoid errors
export default class Location {
    constructor (data) {
        if(data == null) return 
        const {
            id = null, addresss = null, latitude = null, longitude = null, 
            place_id = null, country = null, location_name = null
        } = data
        this.id = id
        this.addresss = addresss 
        this.latitude = latitude
        this.longitude = longitude
        this.place_id = place_id
        this.country = country
        this.location_name = location_name
    }
}
