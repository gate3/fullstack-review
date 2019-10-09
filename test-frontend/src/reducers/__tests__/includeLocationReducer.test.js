
import {INCLUDE_LOCATION} from '../../actions/actionTypes'
import fetchLocations from '../fetchLocationReducer'
import {fetchLocationInitialState} from '../initialState'

const initialState = fetchLocationInitialState

const modifyState = (changes = {}) => ({...initialState, ...changes})

describe('FetchLocations Reducer', () => {
    it('should return initial state when no state or action is provided', () => {
        expect(
            fetchLocations(
                undefined, {}
            )
        ).toEqual(modifyState())
    });

    it('should return data on success', ()=> {
        expect(
            fetchLocations(
                {
                    ...initialState,
                    data: [{ location1: 1 }]
                }, 
                { 
                    type: INCLUDE_LOCATION, 
                    payload: {
                        location2: 2
                    }
                }
            )
        ).toEqual(modifyState({ data: [
            {location2: 2}, { location1: 1 }
        ] }))
    })

    it('should return data in correct order', ()=> {
        expect(
            fetchLocations(
                {
                    ...initialState,
                    data: [{ location1: 1 }]
                }, 
                { 
                    type: INCLUDE_LOCATION, 
                    payload: {
                        location2: 2
                    }
                }
            )
        ).not.toEqual(modifyState({ data: [
            { location1: 1 }, {location2: 2}
        ] }))
    })
});
