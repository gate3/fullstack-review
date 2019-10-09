
import {MODIFY_LOCATION} from '../../actions/actionTypes'
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

    it('Should Edit location value', ()=> {
        expect(
            fetchLocations(
                {
                    ...initialState,
                    data: [{ location_name: 'Kwara', place_id:'SomeId' }]
                }, 
                { 
                    type: MODIFY_LOCATION, 
                    payload: {
                        index: 0,
                        newLocation:{ location_name: 'Lagos', place_id:'SomeId' }
                    }
                }
            )
        ).toEqual(modifyState({ data: [
            { location_name: 'Lagos', place_id:'SomeId' }
        ] }))
    })
});
