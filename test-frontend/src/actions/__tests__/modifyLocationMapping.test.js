import {MODIFY_LOCATION_MAPPING} from '../actionTypes'

import * as actions from '../index'
import mockStore from '../../helpers/testHelper';

import {fetchLocationInitialState} from '../../reducers/initialState'

const store = mockStore(fetchLocationInitialState)

const action = MODIFY_LOCATION_MAPPING

describe('Modify Location Mapping Action', () => {
    beforeEach(() => {
        store.clearActions()
    });
    it(`Should dispatch ${action} return location payload`, () => {
        const expectedActions = [{
            type: MODIFY_LOCATION_MAPPING,
            payload: {'Some_place_id':0}
        }]

        store.dispatch(actions.modifyLocationMapping({'Some_place_id':0}))
        expect(store.getActions()).toMatchObject(expectedActions)
    })
    it(`Should store ${action} snapshot`, () => {
        store.dispatch(actions.modifyLocationMapping({'Some_place_id':0}))
        expect(store.getActions()).toMatchSnapshot()
    });
})