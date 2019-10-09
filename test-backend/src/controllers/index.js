/*
    One method to get the controllers and expose them would be to use a glob matcher
    Like https://www.npmjs.com/package/fast-glob and use it to match all files with pattern

        *.ctrl.js
        
    Then expose those files
*/

module.exports = {
    geocodeAddress: require('./geocodeAddress.ctrl'),
    createLocation: require('./createLocation.ctrl'),
    fetchLocations: require('./fetchLocations.ctrl'),
    deleteLocation: require('./deleteLocation.ctrl'),
    editLocation: require('./editLocation.ctrl')
}