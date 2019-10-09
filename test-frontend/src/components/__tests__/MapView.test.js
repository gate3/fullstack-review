import React from 'react';
import { shallow } from 'enzyme';
import MapView from '../MapView';

let initialState = {
    markers: []
}

it('renders without crashing', () => {
  const wrapper = shallow(<MapView {...initialState} />)
  expect(wrapper.length).toEqual(1)
});
