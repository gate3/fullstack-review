import moxios from 'moxios';
import {ActionType} from 'redux-promise-middleware';

import * as actions from '../index'
import mockStore from '../../helpers/testHelper';
import {fetchLocationInitialState} from '../../reducers/initialState'
import { DELETE_LOCATION, MODIFY_LOCATION_MAPPING, REMOVE_LOCATION  } from '../actionTypes';
import API from '../apiConstants'
import httpRequestHelper from '../../helpers/httpRequestHelper'

const locationMapping = {SomePlaceId:0}
const store = mockStore({
    fetchLocationReducer: {
        ...fetchLocationInitialState,
        locationMapping
    }
})

const action = DELETE_LOCATION

describe('Modify Location Action', () => {
    beforeEach(() => {
        moxios.install(httpRequestHelper.httpRequest);
        store.clearActions();
    });
    afterEach(function () {
        moxios.uninstall(httpRequestHelper.httpRequest)
    })
    it(`Should make successful api call, should dispatch async ${action} and other actions`, async () => {
        const id = 1
        const message = 'Delete Successful'
        moxios.stubRequest(`${API.DELETE}${id}`, {
            status: 200,
            response: {
                status: true,
                message,
                data: null
            }
        })
        
        await store.dispatch(actions.deleteLocation({id, place_id: 'SomePlaceId'}))
        const dispatchedActions = store.getActions()
        expect(dispatchedActions.length).toEqual(4)
        expect(dispatchedActions[0]).toEqual({ type: `${action}_${ActionType.Pending}` })
        expect(dispatchedActions[1]).toEqual({ type: REMOVE_LOCATION, payload:[] })
        expect(dispatchedActions[2]).toEqual({ type: MODIFY_LOCATION_MAPPING, payload: {} })
        expect(dispatchedActions[3]).toEqual({ type: `${action}_${ActionType.Fulfilled}`, payload: message })
    })
})