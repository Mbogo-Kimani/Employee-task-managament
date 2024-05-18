import * as React from 'react';
import Map, {Layer, Marker, Source} from 'react-map-gl';
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


const lineData = {
  'type': 'Feature',
  'geometry': {
    'type': 'LineString',
    'coordinates': [
      [36.787758, -1.293053],
      [36.798140, -1.289100]
    ]
  }
};

const lineLayer = {
  id: 'route',
  type: 'line',
  source: 'route',
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#ffb415',
    'line-width': 3
  }
};

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
    mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
    >
      <Layer {...parkLayer} /> 
      <Layer {...buildingLayer} />
      <Source id="route" type="geojson" data={lineData}>
        <Layer {...lineLayer} />
      </Source> 
      <Marker longitude={36.787758} latitude={-1.293053} anchor="bottom" >
        <Icon src='pin' fill='#ff0000' className='w-[30px] h-[30px] mr-4 cursor-pointer' onClick={() => setShowPasswords(!showPasswords)}/>
      </Marker> 
      <Marker longitude={36.798140} latitude={-1.289100} anchor="bottom" >
        <Icon src='pin' fill='#ff0000' className='w-[30px] h-[30px] mr-4 cursor-pointer' onClick={() => setShowPasswords(!showPasswords)}/>
      </Marker> 
    </Map>
    
}

export default Maps;