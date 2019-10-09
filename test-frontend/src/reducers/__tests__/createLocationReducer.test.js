import { ActionType } from 'redux-promise-middleware';

import {CREATE_LOCATION} from '../../actions/actionTypes'
import createLocations from '../createLocationReducer'
import {createLocationinitialState} from '../initialState'

const initialState = createLocationinitialState

const PENDING = `${CREATE_LOCATION}_${ActionType.Pending}`
const FULFILLED = `${CREATE_LOCATION}_${ActionType.Fulfilled}`
const REJECTED = `${CREATE_LOCATION}_${ActionType.Rejected}`

const modifyState = (changes = {}) => ({...initialState, ...changes})

describe('CreateLocations Reducer', () => {
    it('should return initial state when no state or action is provided', () => {
        expect(
            createLocations(
                undefined, {}
            )
        ).toEqual(modifyState())
    });

    it('should be in loading state when request is pending', ()=> {
        expect(
            createLocations(
                initialState, { type: PENDING }
            )
        ).toEqual(modifyState({loading: true}))
    })

    it('should not load and return error and a message when request fails', ()=> {
        expect(
            createLocations(
                initialState, { type: REJECTED, payload: {
                    message: 'Error'
                }}
            )
        ).toEqual(modifyState({ loading: false, error: true, message: 'Error' }))
    })

    it('should not be in loading state and should return newly created location', ()=> {
        expect(
            createLocations(
                initialState, { 
                    type: FULFILLED, 
                    payload: [{ location_name: 'Lagos', place_id:'SomeId' }]
                }
            )
        ).toEqual(modifyState({ data: [{ location_name: 'Lagos', place_id:'SomeId' }] }))
    })
});

