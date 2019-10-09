import React from 'react'
import {Form, Button} from 'react-bootstrap'

export default ({location_name, latitude, longitude, onChangeFunc, handleEditSubmissionFunc}) => (
    <Form onSubmit={e=>handleEditSubmissionFunc(e)}>
        <Form.Group controlId="location">
            <Form.Control 
                name='location_name'
                placeholder="Enter Location Name" 
                defaultValue={location_name}
                onChange={(e)=>onChangeFunc(e)}
            />
        </Form.Group>
        <Form.Group controlId="latitude">
            <Form.Control 
                name='latitude'
                placeholder="Latitude" 
                defaultValue={latitude}
                onChange={(e)=>onChangeFunc(e)}
            />
        </Form.Group>
        <Form.Group controlId="longitude">
            <Form.Control 
                name='longitude'
                placeholder="Longitude" 
                defaultValue={longitude}
                onChange={(e)=>onChangeFunc(e)}            
            />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ float: 'right' }}>
            Save
        </Button>
    </Form>
)