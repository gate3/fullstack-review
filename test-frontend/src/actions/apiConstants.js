const BASE_URL = process.env.REACT_APP_API_BASE_URL

const LOCATION_BASE = `${BASE_URL}location/`

const API = {
    CREATE: `${LOCATION_BASE}new`,
    FETCH_ALL: `${LOCATION_BASE}`,
    EDIT: `${LOCATION_BASE}`,
    DELETE: `${LOCATION_BASE}`
}

export default API
