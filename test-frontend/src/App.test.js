import moxios from 'moxios';
import React from 'react';
import { render, cleanup} from "@testing-library/react";
import { Provider } from 'react-redux';
import mockStore from './helpers/testHelper';
import {fetchLocationInitialState} from './reducers/initialState'
import httpRequestHelper from './helpers/httpRequestHelper'
import API from './actions/apiConstants'

/**
 * We need only test the ordinary component not the connected component. 
 * Since we already wrote tests for actions and reducers to see it works properly. 
 * We can simply mock the dispatch function and reducers and see when they are called.
 * Hence we only import the named component.
 */
import ConnectedApp, {App} from './App'; 

let props = {
  dispatch: () => null, 
  fetchLocationData: {
    data: []
  }
};

const store = mockStore({
  fetchLocationReducer: fetchLocationInitialState
})

/**
 * useEffect doesn't work when using enzyme shallow rendering. A workaround would be 
 * to use act() which ensures the component has been rendered correctly. 
 * https://reactjs.org/docs/testing-recipes.html#act
 * Since React Testing Library uses act under the hood 
 */
describe('Main App Container', () => {
  beforeEach(() => {
    props.dispatch = jest.fn()
    moxios.install(httpRequestHelper.httpRequest);
    store.clearActions();
  });
  afterEach(function () {
    moxios.uninstall(httpRequestHelper.httpRequest)
    cleanup()
  })
  it('should render component without crashing', () => {
    const {asFragment} = render(<App {...props} />)
    expect(asFragment()).toMatchSnapshot()
    expect(props.dispatch).toHaveBeenCalled()
  });

  it('should render connected component without crashing', () => {
    const data = [
      {location_name:'Yaba, Lagos', place_id: 'SomePlaceId'},
      {location_name:'Mushin, Lagos', place_id: 'SomePlaceId2'}
    ]

    moxios.stubRequest(API.FETCH_ALL, {
        status: 200,
        response: {
            status: true,
            message: '',
            data
        }
    })
    render(
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    )
  });
  
});
