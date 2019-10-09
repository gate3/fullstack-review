
import {MODIFY_LOCATION_MAPPING} from '../../actions/actionTypes'
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

    it('Should Edit mapped values of locations array index', ()=> {
        expect(
            fetchLocations(
                initialState, 
                { 
                    type: MODIFY_LOCATION_MAPPING, 
                    payload:{
                        SomeId:0, SomeId2:1
                    }
                }
            )
        ).toEqual(modifyState({ 
            locationMapping:{SomeId:0, SomeId2:1} 
        }))
    })
});
