import React from 'react';
import { shallow } from 'enzyme';
import EditLocation from '../EditLocation';

let initialState = {
    location_name: null, 
    latitude: null, 
    longitude: null, 
    onChangeFunc: null, 
    handleEditSubmissionFunc: null
}

it('renders without crashing', () => {
  const wrapper = shallow(<EditLocation {...initialState} />)
  expect(wrapper.length).toEqual(1)
});
