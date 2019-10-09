import React from 'react'
import {Card, Col, Button, Row} from 'react-bootstrap'

export default (props) => {
    const {onEdit, locationData, onDeleteFunc} = props
    const { location_name, latitude, longitude } = locationData

    return <Col style={{ marginTop:'15px' }}>
        <Card>
            <Card.Body>
                <Card.Title>{location_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {location_name}
                </Card.Subtitle>
                <Card.Text>
                    Latitude: {latitude}
                </Card.Text>
                <Card.Text>
                    Longitude: {longitude}
                </Card.Text>
                <Row>
                    <Col>
                        <Button variant="outline-dark" 
                            onClick={()=>onEdit(locationData)}>
                            Edit
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="outline-dark"
                            onClick={()=>onDeleteFunc(locationData)}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </Col>
}
