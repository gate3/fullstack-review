import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';

const middleware = [thunk, promiseMiddleware]

export default configureStore(middleware)