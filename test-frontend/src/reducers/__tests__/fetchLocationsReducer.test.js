import { ActionType } from 'redux-promise-middleware';

import {FETCH_LOCATIONS} from '../../actions/actionTypes'
import fetchLocations from '../fetchLocationReducer'
import {fetchLocationInitialState} from '../initialState'

const initialState = fetchLocationInitialState

const PENDING = `${FETCH_LOCATIONS}_${ActionType.Pending}`
const FULFILLED = `${FETCH_LOCATIONS}_${ActionType.Fulfilled}`
const REJECTED = `${FETCH_LOCATIONS}_${ActionType.Rejected}`

const modifyState = (changes = {}) => ({...initialState, ...changes})

describe('FetchLocations Reducer', () => {
    it('should return initial state when no state or action is provided', () => {
        expect(
            fetchLocations(
                undefined, {}
            )
        ).toEqual(modifyState())
    });

    it('should be in loading state when request is pending', ()=> {
        expect(
            fetchLocations(
                initialState, { type: PENDING }
            )
        ).toEqual(modifyState({loading: true}))
    })

    it('should not load and return error and a message when request fails', ()=> {
        expect(
            fetchLocations(
                initialState, { type: REJECTED, payload: {
                    message: 'Error'
                }}
            )
        ).toEqual(modifyState({ loading: false, error: true, message: 'Error' }))
    })

    it('should not be in loading state and should return data on success', ()=> {
        expect(
            fetchLocations(
                initialState, { 
                    type: FULFILLED, 
                    payload: [{ location_name: 'Lagos', place_id:'SomeId' }]
                }
            )
        ).toEqual(modifyState({ data: [{ location_name: 'Lagos', place_id:'SomeId' }] }))
    })
});

