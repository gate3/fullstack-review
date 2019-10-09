import React from 'react';
import { shallow } from 'enzyme';
import MapView from '../MapView';

let initialState = {
    locations: [], 
    currentEdit: null, 
    setCurrentEditFunc: () => null, 
    onChange: () => null, 
    handleEditSubmissionFunc: () => null, 
    onDelete: () => null
}

it('renders without crashing', () => {
  const wrapper = shallow(<MapView {...initialState} />)
  expect(wrapper.length).toEqual(1)
});
