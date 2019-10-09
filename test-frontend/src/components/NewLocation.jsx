import React from 'react'
import {Form, Button} from 'react-bootstrap'

const styles = {
    borderBottom: '#ccc solid 1px',
    paddingBottom: '15px'
}

export default ({onSubmit, setLocationFunc}) => (
    <Form style={styles} onSubmit={(e)=>onSubmit(e)}>
        <Form.Group controlId="location">
            <Form.Control 
                placeholder="Enter Location" 
                onChange={(e)=>setLocationFunc(e.target.value)}
            />
        </Form.Group>
        <Button variant="primary"
            type="submit" 
            style={{ float: 'right' }}>
            Add Map
        </Button>
    </Form>
)