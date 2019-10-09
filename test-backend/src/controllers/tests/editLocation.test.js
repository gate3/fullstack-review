const sinon = require('sinon')
const editLocation = require('../editLocation.ctrl')
const {expect} = require('./testBundle')

const db = {
    fetchWhere: () => null,
    edit: () => null
}

let data;
let id;

describe('Edit Location geocoding data', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox()
        sandbox.stub(db, 'edit')
        sandbox.stub(db, 'fetchWhere')
    });
    afterEach(() => sandbox.restore());
    
    describe('Positive tests', () => {
        beforeEach(() => {
            db.edit.resolves(Promise.resolve('Location Edited'))
        });
        it('Should run without errors', async () => {
            id = 2
            data = {
                latitude:'6.539173'
            }

            db.fetchWhere.resolves(Promise.resolve(data))

            const result = await editLocation(db, id, data)

            expect(result).to.equal('Location Edited')

            expect(db.fetchWhere.called).to.equal(true)
            expect(db.fetchWhere.calledWith({id})).to.equal(true)

            expect(db.edit.called).to.equal(true)
            expect(db.edit.calledWith({id}, data)).to.equal(true)
        });
    })

    describe('Negative Tests', () => {
        beforeEach(() => {
            db.edit.resolves(Promise.resolve('Location Edited'))
        });

        it('Should fail when no id is supplied', async () => {
            try{
                await editLocation(db)
            }catch(e){
                expect(e.message).to.equal('Please provide a valid id.')
            }
            expect(db.fetchWhere.called).to.equal(false)
            expect(db.edit.called).to.equal(false)
        });

        it('Should throw error when id supplied is not a number', async () => {
            try{
                await editLocation(db, 'string')
            }catch(e){
                expect(e.message).to.equal('Please provide a valid id.')
            }
            expect(db.fetchWhere.called).to.equal(false)
            expect(db.edit.called).to.equal(false)
        });

        it('Should throw an error invalid field is supplied', async () => {
            id = 2
            data = {
                latitude2:'6.539173'
            }

            try{
                await editLocation(db, id, data)
            }catch(e){
                expect(e.message).to.equal(`Invalid field latitude2 provided.`)
            }
            expect(db.fetchWhere.called).to.equal(false)
            expect(db.edit.called).to.equal(false)
        });

        it('Should throw an error no value is supplied', async () => {
            id = 2
            data = {}

            try{
                await editLocation(db, id, data)
            }catch(e){
                expect(e.message).to.equal('Please provide fields to edit')
            }
            expect(db.fetchWhere.called).to.equal(false)
            expect(db.edit.called).to.equal(false)
        });

        it('Should throw an error no value is returned for this id', async () => {
            id = 2
            data = {
                latitude:'6.539173'
            }

            db.fetchWhere.resolves(Promise.resolve([]))

            try{
                await editLocation(db, id, data)
            }catch(e){
                expect(e.message).to.equal('Invalid location provided.')
            }
            expect(db.fetchWhere.called).to.equal(true)
            expect(db.edit.called).to.equal(false)
        });
    });
})