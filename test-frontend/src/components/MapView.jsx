import React from 'react'
import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};

function MapContainer (props) {
    return  <Map
        google={props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 52.5200, lng: 13.4050}}>
        {Markers(props.markers)}
    </Map>
}

function Markers (markers) {
    return markers.map((m, i)=> (
        <Marker 
            key={i} 
            id={i} 
            position={{
                lat: m.latitude,
                lng: m.longitude
            }}
        />
    ))
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GMAP_KEY
})(MapContainer);
