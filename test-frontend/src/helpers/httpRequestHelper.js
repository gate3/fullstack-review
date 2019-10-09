import axios from 'axios'

class HttpRequestHelper {
  constructor() {
    this.httpRequest = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        timeout: 3000,
    });
  }

  genericRequest (url, method, data = null) {
    const options = {url, method}
    if(data != null) options.data = data
    return this.httpRequest(options)
  }

  makePostRequest(endpoint, data) {
    return this.genericRequest(endpoint, 'post', data);
  }

  makeGetRequest(endpoint) {
    return this.genericRequest(endpoint, 'get');
  }

  makeDeleteRequest(endpoint) {
    return this.genericRequest(endpoint, 'delete');
  } 

  makePutRequest (endpoint, data) {
    return this.genericRequest(endpoint, 'put', data)
  }
}

export default new HttpRequestHelper();
