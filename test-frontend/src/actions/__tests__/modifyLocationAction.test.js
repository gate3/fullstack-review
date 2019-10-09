import {MODIFY_LOCATION} from '../actionTypes'

import * as actions from '../index'
import mockStore from '../../helpers/testHelper';

import {fetchLocationInitialState} from '../../reducers/initialState'

const store = mockStore(fetchLocationInitialState)

const action = MODIFY_LOCATION

describe('Modify Location Action', () => {
    beforeEach(() => {
        store.clearActions()
    });
    it(`Should dispatch ${action} return location payload`, () => {
        const expectedActions = [{
            type: MODIFY_LOCATION,
            payload: {place_id:'3ejdk3'}
        }]

        store.dispatch(actions.modifyLocation({place_id:'3ejdk3'}))

        expect(store.getActions()).toMatchObject(expectedActions)
    });
    it(`Snapshot for ${action} should be correct`, () => {
        store.dispatch(actions.modifyLocation('Kwara'))
        expect(store.getActions()).toMatchSnapshot()
    });
});
