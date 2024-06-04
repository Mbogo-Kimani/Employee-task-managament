import React from 'react';
import Map, {Layer, Marker, Source} from 'react-map-gl';
import Icon from '../../Common/Icon';

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

function MapPlot({ view, mapPoints, mapLines }) {
  return (
    <Map
      mapLib={import('mapbox-gl')}
      initialViewState={{
        longitude: 36.785719,
        latitude: -1.289928,
        zoom: 10
      }}
      style={{width: "80vw", height: "90vh"}}
      mapStyle={`mapbox://styles/mapbox/${view}`}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
    >
      <Layer {...parkLayer} /> 
      <Layer {...buildingLayer} />
      {
        (Array.isArray(mapLines) ? mapLines : []).map(elem => {
          const lineData = {
            'type': 'Feature',
            'geometry': {
              'type': 'LineString',
              'coordinates': [
                [elem.point_a_long, elem.point_a_lat],
                [elem.point_b_long, elem.point_b_lat],
              ],
            }
          };

          const lineLayer = {
            id: `route${elem.id}`,
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

          return (
            <Source key={elem.id} id={lineLayer.id} type="geojson" data={lineData}>
              <Layer {...lineLayer} />
            </Source>
          )
        })
      }

      {
        (Array.isArray(mapPoints) ? mapPoints : []).map(elem => {
          return (
            <Marker key={elem.id} longitude={elem.point_long} latitude={elem.point_lat} anchor="bottom" >
              <Icon src='pin' fill='#ff0000' className='w-[30px] h-[30px] mr-4 cursor-pointer'/>
            </Marker>
          )
        })
      }
    </Map>
  )
}

export default MapPlot;
