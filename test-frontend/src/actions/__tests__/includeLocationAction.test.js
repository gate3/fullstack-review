import {INCLUDE_LOCATION} from '../actionTypes'

import * as actions from '../index'
import mockStore from '../../helpers/testHelper';

import {fetchLocationInitialState} from '../../reducers/initialState'

const store = mockStore(fetchLocationInitialState)

const action = INCLUDE_LOCATION

describe('Include Location Action', () => {
    beforeEach(() => {
        store.clearActions()
    });
    it(`Should dispatch ${action} return location payload`, () => {
        const expectedActions = [{
            type: INCLUDE_LOCATION,
            payload: 'Kwara'
        }]

        store.dispatch(actions.includeNewLocation('Kwara'))

        expect(store.getActions()).toMatchObject(expectedActions)
    });
    it(`Snapshot for ${action} should be correct`, () => {
        store.dispatch(actions.includeNewLocation('Kwara'))

        expect(store.getActions()).toMatchSnapshot()
    });
});
