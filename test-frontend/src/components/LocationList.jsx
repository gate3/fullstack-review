import React from 'react'
import {Col} from 'react-bootstrap'
import Location from './Location';
import EditLocation from './EditLocation';

// I used place id as the key here because its unique

export default ({
        locations, currentEdit, setCurrentEditFunc, 
        onChange, handleEditSubmissionFunc, onDelete
}) => (

    currentEdit != null ? 
    <EditLocation 
        {...currentEdit} 
        onChangeFunc={onChange} 
        handleEditSubmissionFunc={handleEditSubmissionFunc}
    /> :
    <Col className='location-container'>
        {
            locations.map(l=>
                <Location 
                    locationData={l} key={l.place_id} 
                    onEdit={setCurrentEditFunc} 
                    onDeleteFunc={onDelete}
                />
            )
        }
    </Col>
)
