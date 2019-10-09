const sinon = require('sinon')
const fetchLocations = require('../fetchLocations.ctrl')
const {expect} = require('./testBundle')

const db = {
    fetchAll: () => null,
}

describe('Fetch all stored locations', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(db, 'fetchAll')
    });
    afterEach(() => sandbox.restore());

    describe('Positive tests', () => {
        beforeEach(() => {
            db.fetchAll.resolves(Promise.resolve([]))
        });

        it('Should run without errors', async () => {
            const result = await fetchLocations(db)
            expect(result).to.be.an('array').length(0)
            expect(db.fetchAll.called).to.equal(true)
            expect(db.fetchAll.calledWith()).to.equal(true)
        });
    });

    describe('Negative Tests', () => {
        it('Should result in an error because db object is missing', async () => {
            
            try{
                await fetchLocations()
            }catch(e){
                expect(e.message).to.equal('Error occurred fetching locations')
            }
            
            expect(db.fetchAll.called).to.equal(false)
            expect(db.fetchAll.calledWith()).to.equal(false)
        });
    });
    
})