import React from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';

interface ClickMarkerProps {
    position: LatLng,
    setPosition: (value: LatLng) => void
}

const ClickMarker = (props: ClickMarkerProps) => {
    
    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        props.setPosition(new LatLng(lat, lng));
      },
    });
    
    return (
      props.position !== new LatLng(0,0) ? (
        <Marker
          position={props.position}
          interactive={false}
        />
      ) : null)
}

export default ClickMarker;