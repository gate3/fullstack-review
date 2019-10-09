import moxios from 'moxios';
import {ActionType} from 'redux-promise-middleware';

import * as actions from '../index'
import mockStore from '../../helpers/testHelper';
import {fetchLocationInitialState} from '../../reducers/initialState'
import { FETCH_LOCATIONS, MODIFY_LOCATION_MAPPING  } from '../actionTypes';
import API from '../apiConstants'
import httpRequestHelper from '../../helpers/httpRequestHelper'

const store = mockStore({
    fetchLocationReducer: fetchLocationInitialState
})

const action = FETCH_LOCATIONS
let locationMapping

describe('Modify Location Action', () => {
    beforeEach(() => {
        moxios.install(httpRequestHelper.httpRequest);
        store.clearActions();
    });
    afterEach(function () {
        moxios.uninstall(httpRequestHelper.httpRequest)
    })
    it(`Should make successful api call and dispatch async ${action}`, async () => {
        const data = [
            {location_name:'Yaba, Lagos', place_id: 'SomePlaceId'},
            {location_name:'Mushin, Lagos', place_id: 'SomePlaceId2'}
        ]
        locationMapping = {SomePlaceId:0, SomePlaceId2:1}

        moxios.stubRequest(API.FETCH_ALL, {
            status: 200,
            response: {
                status: true,
                message: '',
                data
            }
        })

        await store.dispatch(actions.fetchLocations())
        const dispatchedActions = store.getActions()
        expect(dispatchedActions.length).toEqual(3)
        expect(dispatchedActions[0]).toEqual({ type: `${action}_${ActionType.Pending}` })
        expect(dispatchedActions[1]).toEqual({ type: MODIFY_LOCATION_MAPPING, payload: locationMapping })
        expect(dispatchedActions[2]).toEqual({ type: `${action}_${ActionType.Fulfilled}`, payload: data })
    })
})