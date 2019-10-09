import React from 'react';
import { render, cleanup, fireEvent} from "@testing-library/react";
import EditLocation from '../EditLocation';

let props = (newProps = {}) => (Object.assign({
    location_name: null, 
    latitude: null, 
    longitude: null, 
    onChangeFunc: jest.fn(), 
    handleEditSubmissionFunc: jest.fn()
}, newProps))

describe('<EditLocation />', () => {
  afterEach(() => {
    cleanup()
  });
  it('should render without crashing and render correct number of elements', () => {
    const {asFragment, container} = render(<EditLocation {...props()} />)
    expect(asFragment()).toMatchSnapshot()
    expect(container.querySelectorAll('input').length).toBe(3) // check that all input elements are displayed
    expect(container.querySelectorAll('button').length).toBe(1)
  });
  it('should render correct passed value for elements', () => {
    const newProps = {
      location_name: 'Yaba, Lagos',
      latitude: "3.456",
      longitude: "4.556",
      onChangeFunc: jest.fn(),
      handleEditSubmissionFunc: jest.fn()
    }

    const {getByPlaceholderText} = render(<EditLocation {...props(newProps)} />)
    expect(getByPlaceholderText('Enter Location Name').value).toEqual(newProps.location_name)
    expect(getByPlaceholderText('Latitude').value).toEqual(newProps.latitude)
    expect(getByPlaceholderText('Longitude').value).toEqual(newProps.longitude)
  })

  it('should submit form when button clicked with correct values', () => {
    const newProps = {
      location_name: 'Yaba, Lagos',
      latitude: "3.456",
      longitude: "4.556",
      onChangeFunc: jest.fn(),
      handleEditSubmissionFunc: jest.fn()
    }

    const tempProp = props(newProps)
    const {getByPlaceholderText, getByText} = render(<EditLocation {...tempProp} />)
    
    const inputLocName = getByPlaceholderText('Enter Location Name')
    const lat = getByPlaceholderText('Latitude')
    const lng = getByPlaceholderText('Longitude')
    fireEvent.change(inputLocName, {target:{value:`${newProps.location_name}2`}})
    expect(inputLocName.value).toBe(`${newProps.location_name}2`)

    fireEvent.change(lat, {target:{value:`${newProps.latitude}2`}})
    expect(lat.value).toBe(`${newProps.latitude}2`)

    fireEvent.change(lng, {target:{value:`${newProps.longitude}2`}})
    expect(lng.value).toBe(`${newProps.longitude}2`)
    expect(tempProp.onChangeFunc).toHaveBeenCalledTimes(3)

    fireEvent.click(getByText('Save'))
    expect(tempProp.handleEditSubmissionFunc).toHaveBeenCalled()
  })
});
