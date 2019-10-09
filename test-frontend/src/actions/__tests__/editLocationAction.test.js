import moxios from 'moxios';
import {ActionType} from 'redux-promise-middleware';

import * as actions from '../index'
import mockStore from '../../helpers/testHelper';
import {fetchLocationInitialState} from '../../reducers/initialState'
import { EDIT_LOCATION, MODIFY_LOCATION  } from '../actionTypes';
import API from '../apiConstants'
import httpRequestHelper from '../../helpers/httpRequestHelper'

const locationMapping = {SomePlaceId:0}
const store = mockStore({
    fetchLocationReducer: {
        ...fetchLocationInitialState,
        locationMapping
    }
})

const action = EDIT_LOCATION

describe('Modify Location Action', () => {
    beforeEach(() => {
        moxios.install(httpRequestHelper.httpRequest);
        store.clearActions();
    });
    afterEach(function () {
        moxios.uninstall(httpRequestHelper.httpRequest)
    })
    it(`Should make successful api call, should dispatch async ${action} and other actions`, async () => {
        const data = {location_name:'Yaba, Lagos', place_id: 'SomePlaceId'} 
        
        const id = 1

        moxios.stubRequest(`${API.EDIT}${id}`, {
            status: 200,
            response: {
                status: true,
                message: '',
                data
            }
        })
        
        await store.dispatch(actions.editLocation(id, {location_name:'Oshodi, Lagos'}))
        const dispatchedActions = store.getActions()
        expect(dispatchedActions.length).toEqual(3)
        expect(dispatchedActions[0]).toEqual({ type: `${action}_${ActionType.Pending}` })
        expect(dispatchedActions[1]).toEqual({ type: MODIFY_LOCATION, payload: {index:0, newLocation:data } })
        expect(dispatchedActions[2]).toEqual({ type: `${action}_${ActionType.Fulfilled}` })
    })
})