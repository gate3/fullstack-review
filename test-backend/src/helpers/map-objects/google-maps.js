const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GEOCODING_KEY,
    Promise: Promise
})

module.exports = {
    geocode: (address) => googleMapsClient.geocode({address}).asPromise(),
    // Add other functions and values as needed
}