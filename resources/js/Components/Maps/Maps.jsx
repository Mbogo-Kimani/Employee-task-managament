import * as React from 'react';
import Map, {Layer, Marker} from 'react-map-gl';
import Icon from '../../Components/Common/Icon';


const parkLayer = {
  id: 'landuse_park',
  type: 'fill',
  source: 'mapbox',
  'source-layer': 'landuse',
  filter: ['==', 'class', 'park'],
  paint: {
    'fill-color': '#4E3F88'
  }
};

const buildingLayer = {
  'id': 'add-3d-buildings',
  'source': 'composite',
  'source-layer': 'building',
  'filter': ['==', 'extrude', 'true'],
  'type': 'fill-extrusion',
  'minzoom': 15,
  'paint': {
      'fill-extrusion-color': '#aaa',

      // Use an 'interpolate' expression to
      // add a smooth transition effect to
      // the buildings as the user zooms in.
      'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'height']
      ],
      'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'min_height']
      ],
      'fill-extrusion-opacity': 0.6
  }
}

function Maps({view}) {
  return <Map
    mapLib={import('mapbox-gl')}
    initialViewState={{
      longitude: 36.787758,
      latitude: -1.293053,
      zoom: 10
    }}
    style={{width: "80vw", height: "90vh"}}
    mapStyle={`mapbox://styles/mapbox/${view}`}
    mapboxAccessToken="pk.eyJ1IjoiamVycnk4OCIsImEiOiJjbHZ5dzZpYmYwanBxMmltZXBjcGtpcmhhIn0.sNWGw8ZNZm8yZhW0Rt7fkQ"
    >
      <Layer {...parkLayer} /> 
      <Layer {...buildingLayer} /> 
      <Marker longitude={36.787758} latitude={-1.293053} anchor="bottom" >
        <Icon src='pin' fill='#ff0000' className='w-[30px] h-[30px] mr-4 cursor-pointer' onClick={() => setShowPasswords(!showPasswords)}/>
    </Marker> 
    </Map>
    
}

export default Maps;