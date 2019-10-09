const sinon = require('sinon')
const createLocation = require('../createLocation.ctrl')
const {expect} = require('./testBundle')

const db = {
    fetchWhere: () => null,
    save: () => null
}

let data = {}

describe('Create Location geocoding data', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(db, 'save')
        sandbox.stub(db, 'fetchWhere')
    });
    afterEach(() => sandbox.restore());
    
    describe('Positive tests', () => {
        beforeEach(() => {
            db.fetchWhere.resolves(Promise.resolve([]))
            db.save.resolves(Promise.resolve({}))
        });
        it('Should run without errors', async () => {

            data = {
                latitude:'6.539173', 
                longitude: '3.3841676', 
                place_id: 'Some place id', 
                route: 'Some route', 
                country: 'Some country', 
                address: 'Some Address',
                location_name: 'Some location name'
            }

            const result = await createLocation(db, data)

            expect(result).to.equal('Location saved')

            expect(db.fetchWhere.called).to.equal(true)
            expect(db.fetchWhere.calledWith({
                location_name: data.location_name}
            )).to.equal(true)

            expect(db.save.called).to.equal(true)
            expect(db.save.calledWith(data)).to.equal(true)
        });

        it('Saves when only required fields are supplied', async () => {
            data = {
                latitude:'6.539173', 
                longitude: '3.3841676', 
            }

            await createLocation(db, data)

            expect(db.save.called).to.equal(true)
        });
    });

    describe('Negative tests', () => {
        it('Fails because no data supplied', async () => {
            db.fetchWhere.resolves(Promise.resolve([]))
            db.save.resolves(Promise.resolve({}))

            try{
                await createLocation(db)
            }catch(e){
                expect(e.message).to.equal('A problem occurred saving location')
            }
            expect(db.fetchWhere.called).to.equal(false)
            expect(db.save.called).to.equal(false)
        });

        it('Fails because db object was not supplied', async () => {
            try{
                await createLocation(null, {})
            }catch(e){
                expect(e.message).to.equal('A problem occurred saving location')
            }
            expect(db.fetchWhere.called).to.equal(false)
            expect(db.save.called).to.equal(false)
        });

        it('Does not save because location exists already', async () => {

            data = {
                latitude:'6.539173', 
                longitude: '3.3841676', 
                place_id: 'Some place id', 
                route: 'Some route', 
                country: 'Some country', 
                address: 'Some Address',
                location_name: 'Some location name'
            }

            db.fetchWhere.resolves(Promise.resolve([data]))
            db.save.resolves(Promise.resolve('Location exists already'))

            await createLocation(db, data)

            expect(db.fetchWhere.called).to.equal(true)
            expect(db.fetchWhere.calledWith({
                location_name: data.location_name}
            )).to.equal(true)

            expect(db.save.called).to.equal(false)
        });
    });
});