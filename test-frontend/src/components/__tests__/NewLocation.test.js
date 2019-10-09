import React from 'react';
import { shallow } from 'enzyme';
import NewLocation from '../NewLocation';

let initialState = {
    onSubmit: () => null, 
    setLocationFunc: () => null
}

it('renders without crashing', () => {
  const wrapper = shallow(<NewLocation {...initialState} />)
  expect(wrapper.length).toEqual(1)
});
