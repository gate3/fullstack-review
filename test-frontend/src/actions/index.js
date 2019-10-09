import API from './apiConstants'
import {
  CREATE_LOCATION, FETCH_LOCATIONS, 
  INCLUDE_LOCATION, EDIT_LOCATION, 
  MODIFY_LOCATION_MAPPING, MODIFY_LOCATION,
  DELETE_LOCATION, REMOVE_LOCATION
} from './actionTypes'
import httpRqHelper from '../helpers/httpRequestHelper'

const reArrangeDataCache = (getState, data, key) => {
  const {fetchLocationReducer} = getState()
  
  const newDataLength = data.length
  const locMapping = Object.assign({}, fetchLocationReducer.locationMapping)
  Object.keys(locMapping).forEach(k=>{
    locMapping[k] += newDataLength
  })
  data.forEach((d, i)=>locMapping[d[key]] = i)
  return locMapping
}

export const includeNewLocation = location => ({
  type: INCLUDE_LOCATION,
  payload: location
});

export const modifyLocationMapping = mapping => ({
  type: MODIFY_LOCATION_MAPPING,
  payload: mapping
});

export const modifyLocation = locationData => ({
  type: MODIFY_LOCATION,
  payload: locationData
});

export const removeLocation = newData => ({
  type: REMOVE_LOCATION,
  payload: newData
});

export const createLocation = address => (dispatch, getState) => dispatch({
  type: CREATE_LOCATION,
  async payload() {
    try {
      const endpoint = API.CREATE
      const result = await httpRqHelper.makePostRequest(endpoint, {address})
      const {status, data, message} = result.data
      
      if(status){
        dispatch(includeNewLocation(data))
        const locMapping = reArrangeDataCache(getState, [data], 'place_id')
        dispatch(modifyLocationMapping(locMapping))
        return data
      }
      return Promise.reject(message)
    } catch (e) {
      // console.log(e)
      return Promise.reject(e);
    }
  },
})

export const fetchLocations = () => (dispatch, getState) => dispatch({
  type: FETCH_LOCATIONS,
  async payload() {
    try {
      const endpoint = API.FETCH_ALL
      const result = await httpRqHelper.makeGetRequest(endpoint)
      const {data, status} = result.data
      
      if(status) {
        const locMapping = reArrangeDataCache(getState, data, 'place_id')
        dispatch(modifyLocationMapping(locMapping))
        return data
      }
    } catch (e) {
      console.log(e)
      return Promise.reject(e);
    }
  },
})

export const editLocation = (id, editData) => (dispatch, getState) => dispatch({
  type: EDIT_LOCATION,
  async payload() {
    try {
      const endpoint = `${API.EDIT}${id}`
      const result = await httpRqHelper.makePutRequest(endpoint, editData)
      const {data, status} = result.data
      if(status) {
        const {fetchLocationReducer:{locationMapping}} = getState()
        const index = locationMapping[data.place_id]
        dispatch(modifyLocation({
          index, newLocation: data
        })) 
      }
    } catch (e) {
      console.log(e)
      return Promise.reject(e);
    }
  },
})

export const deleteLocation = ({id, place_id}) => (dispatch, getState) => dispatch({
  type: DELETE_LOCATION,
  async payload() {
    try {
      const endpoint = `${API.DELETE}${id}`
      const result = await httpRqHelper.makeDeleteRequest(endpoint)
      const {message, status} = result.data
      if(status) {
        const {fetchLocationReducer:{locationMapping, data}} = getState()
        const index = locationMapping[place_id]
        const newData = [...data]
        newData.splice(index, 1)
        const newMapping = {}
        newData.forEach((k, i)=>newMapping[k.place_id] = i)
        dispatch(removeLocation(newData))
        dispatch(modifyLocationMapping(newMapping))
        return message
      }
    } catch (e) {
      console.log(e)
      return Promise.reject(e);
    }
  },
})