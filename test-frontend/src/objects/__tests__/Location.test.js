import Location from '../Location'

describe('Location Object', () => {
    it('Should make available all properties that are passed', () => {
        const location = new Location({
            id: 1, addresss:'Some address', latitude: 3.234, longitude: 5.232, 
            place_id: 'someId', country: 'Nigeria', location_name: 'Yaba, Lagos'
        })
        expect(location.id).toEqual(1)
        expect(location.addresss).toEqual('Some address')
        expect(location.latitude).toEqual(3.234)
        expect(location.longitude).toEqual(5.232)
        expect(location.place_id).toEqual('someId')
        expect(location.country).toEqual('Nigeria')
        expect(location.location_name).toEqual('Yaba, Lagos')
    });
});