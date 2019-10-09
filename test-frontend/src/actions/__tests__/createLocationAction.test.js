import moxios from 'moxios';
import {ActionType} from 'redux-promise-middleware';

import * as actions from '../index'
import mockStore from '../../helpers/testHelper';
import {fetchLocationInitialState} from '../../reducers/initialState'
import { CREATE_LOCATION, INCLUDE_LOCATION, MODIFY_LOCATION_MAPPING  } from '../actionTypes';
import API from '../apiConstants'
import httpRequestHelper from '../../helpers/httpRequestHelper'

const store = mockStore({
    fetchLocationReducer: fetchLocationInitialState
})

const action = CREATE_LOCATION
let location
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
        location = {location_name:'Yaba, Lagos', place_id: 'SomePlaceId'}
        locationMapping = {SomePlaceId:0}

        moxios.stubRequest(API.CREATE, {
            status: 200,
            response: {
                status: true,
                message: '',
                data: location
            }
        })

        await store.dispatch(actions.createLocation('Yaba, Lagos'))
        const dispatchedActions = store.getActions()
        expect(dispatchedActions.length).toEqual(4)
        expect(dispatchedActions[0]).toEqual({ type: `${action}_${ActionType.Pending}` })
        expect(dispatchedActions[1]).toEqual({ type: INCLUDE_LOCATION, payload: location })
        expect(dispatchedActions[2]).toEqual({ type: MODIFY_LOCATION_MAPPING, payload: locationMapping })
        expect(dispatchedActions[3]).toEqual({ type: `${action}_${ActionType.Fulfilled}`, payload: location })
    })
})