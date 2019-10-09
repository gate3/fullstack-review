import React from 'react';
import { render, cleanup } from "@testing-library/react";
import Loading from '../Loading';

let props = {
    children: null, 
    visible: false
}

describe('<Loading />', () => {
  afterEach(() => {
    cleanup()
  });
  it('renders without crashing and matches snapshot', () => {
    const {asFragment} = render(<Loading {...props} />)
    expect(asFragment()).toMatchSnapshot()
  });
  it('should not show loading div when visible is false', () => {
    const {container} = render(<Loading {...props} />)
    expect(container.querySelectorAll('div').length).toBe(1)
  });
});
