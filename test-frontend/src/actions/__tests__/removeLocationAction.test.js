import {REMOVE_LOCATION} from '../actionTypes'

import * as actions from '../index'
import mockStore from '../../helpers/testHelper';

import {fetchLocationInitialState} from '../../reducers/initialState'

const store = mockStore(fetchLocationInitialState)

const action = REMOVE_LOCATION

describe('Modify Location Action', () => {
    beforeEach(() => {
        store.clearActions()
    });
    it(`Should dispatch ${action} return location payload`, () => {
        const expectedActions = [{
            type: action,
            payload: 0
        }]

        store.dispatch(actions.removeLocation(0))

        expect(store.getActions()).toMatchObject(expectedActions)
    })
    it(`Snapshot for ${action} should be correct`, () => {
        store.dispatch(actions.removeLocation(0))

        expect(store.getActions()).toMatchSnapshot()
    });
});
