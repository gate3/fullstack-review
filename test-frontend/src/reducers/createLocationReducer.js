import typeToReducer from 'type-to-reducer';
import {
    CREATE_LOCATION
} from '../actions/actionTypes';
import {createLocationinitialState} from './initialState'

const initialState = createLocationinitialState

const createLocationReducer = typeToReducer({
    [CREATE_LOCATION]: {
        PENDING: () => ({
            ...initialState,
            loading: true
        }),
        REJECTED: (state, action) => ({
            ...initialState,
            error: true,
            message: action.payload.message
        }),
        FULFILLED: (state, action) => ({
            ...initialState,
            data: action.payload,
        })
    },
}, initialState)

export default createLocationReducer;