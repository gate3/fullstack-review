import { combineReducers } from 'redux'

import createLocationReducer from './createLocationReducer'
import fetchLocationReducer from './fetchLocationReducer'

const rootReducer = combineReducers({
    createLocationReducer,
    fetchLocationReducer
})

export default rootReducer