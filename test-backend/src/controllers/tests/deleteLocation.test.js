const sinon = require('sinon')
const deleteLocation = require('../deleteLocation.ctrl')
const {expect} = require('./testBundle')

const db = {
    delete: () => null,
}

let id;

describe('Delete stored locations', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(db, 'delete')
    });
    afterEach(() => sandbox.restore());

    describe('Positive tests', () => {
        beforeEach(() => {
            id = 2
            db.delete.resolves(Promise.resolve([]))
        });

        it('Should run without errors', async () => {
            const result = await deleteLocation(db, id)

            expect(result).to.equal('Location Deleted Successfully')
            expect(db.delete.called).to.equal(true)
            expect(db.delete.calledWith({id})).to.equal(true)
        });
    });

    describe('Negative Tests', () => {
        it('Should result in an error because id is not supplied', async () => {
            
            try{
                await deleteLocation(db)
            }catch(e){
                expect(e.message).to.equal('Please supply a valid location id')
            }
            
            expect(db.delete.called).to.equal(false)
            expect(db.delete.calledWith({id})).to.equal(false)
        });

        it('Should result in an error because id is not valid', async () => {
            
            try{
                await deleteLocation(db, 'string')
            }catch(e){
                expect(e.message).to.equal('Please supply a valid location id')
            }
            
            expect(db.delete.called).to.equal(false)
            expect(db.delete.calledWith({id})).to.equal(false)
        });
    });
    
})