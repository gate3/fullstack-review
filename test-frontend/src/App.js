import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import { connect } from 'react-redux'

import './App.css';

import MapView from './components/MapView'
import LocationList from './components/LocationList'
import NewLocation from './components/NewLocation'

import Location from './objects/Location'

import { 
  createLocation, fetchLocations, 
  editLocation, deleteLocation
} from './actions'
import Loading from './components/Loading';

const transformToObject = (locations = []) => locations.map(l=>new Location(l))

export function App (props) {
  const {dispatch, fetchLocationData} = props
  const [location, setLocation] = useState('');
  const [currentEdit, setCurrentEdit] = useState(null)
  const [editedLocation, setEditedLocation] = useState({})

  const handleEditChange = ({target:{name, value}}) => {
    const editData = {}
    Object.assign(editData, editedLocation)
    editData[name] = value
    setEditedLocation(editData)
  }
  
  const handleEditSubmission = (e) => {
    e.preventDefault()
    dispatch(editLocation(currentEdit.id, editedLocation))
    setCurrentEdit(null)
    setEditedLocation({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createLocation(location))
  }

  const handleDeletion = (l) => {
    dispatch(deleteLocation(l))
  }

  useEffect(()=> {
    dispatch(fetchLocations())
  }, [])

  return (
    <Container fluid>
      <Row>

        <Col xs={9} className='map-container'>
          <MapView markers={transformToObject(fetchLocationData.data)}/> 
        </Col>

        <Col xs={4} className='map-listing-container'>

          <NewLocation 
            setLocationFunc={setLocation}
            onSubmit={handleSubmit} 
          />
          <Loading visible={fetchLocationData.loading}>
            <LocationList currentEdit={currentEdit} 
              setCurrentEditFunc={setCurrentEdit}
              locations={transformToObject(fetchLocationData.data)}
              onChange={handleEditChange}
              handleEditSubmissionFunc={handleEditSubmission}
              onDelete={handleDeletion}
            />
          </Loading>
        </Col>

      </Row>  
      
    </Container>
  )
}

const mapStateToProps = ({fetchLocationReducer}) => ({
  fetchLocationData: fetchLocationReducer,
})

export default connect(mapStateToProps)(App);
