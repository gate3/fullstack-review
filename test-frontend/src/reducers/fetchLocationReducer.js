import typeToReducer from 'type-to-reducer';
import {
    FETCH_LOCATIONS, INCLUDE_LOCATION, 
    MODIFY_LOCATION_MAPPING, MODIFY_LOCATION,
    REMOVE_LOCATION
} from '../actions/actionTypes';
import {fetchLocationInitialState} from './initialState'

const initialState = fetchLocationInitialState

/**
 * @param {*} newPayload - New Location to add as an array
 * @param {*} oldState - The existing state with location data
 */
const addNewLocations = (newPayload = [], oldState) => {
    const data = [...oldState.data]
    if(newPayload.length > 0){
        data.unshift(...newPayload) 
    }
    return data
}

const fetchLocationReducer = typeToReducer({
    [FETCH_LOCATIONS]: {
        PENDING: () => ({
            ...initialState,
            loading: true
        }),
        REJECTED: (state, {payload}) => ({
            ...initialState,
            error: true,
            message: payload.message
        }),
        FULFILLED: (state, {payload}) => {
            // We do it this way to prepare for pagination or infinite loading of data
            const data = addNewLocations(payload, state)
            return {
                ...state,
                loading:false,
                data
            }
        }
    },
    [INCLUDE_LOCATION]: (state, {payload}) => {
        const data = addNewLocations([payload], state)
        return {
            ...state,
            data
        }
    },
    [MODIFY_LOCATION]: (state, {payload:{index, newLocation}}) => {// for edit location
        const data = [...state.data]
        data[index] = newLocation
        return {
            ...state,
            data
        }
    },
    [MODIFY_LOCATION_MAPPING]: (state, {payload}) => ({
        ...state,
        locationMapping: payload
    }),
    [REMOVE_LOCATION]: (state, {payload}) => ({
        ...state,
        data: payload
    })
}, initialState)

export default fetchLocationReducer;
