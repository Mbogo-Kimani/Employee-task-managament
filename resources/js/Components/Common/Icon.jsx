import React from 'react'
import { icons, viewBox } from '../../data/icons'
import { rects } from '../../data/rects'
import PictureComp from './PictureComp'

function Icon({ src, fill = '#333', viewBoxCustom = '0 0 512 512', className = '', onClick = () => {}, imgClassName = '' }) {
  if (src.indexOf('.') > 0) {
    return (
      <PictureComp 
        src={src}
        imgClassName={imgClassName}
        className={className}
        onClick={onClick}
      />
    )
  }

  function processRect() {
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={ viewBox[src] || viewBoxCustom }
      className={className}
      onClick={onClick}
    >
      {
        (icons[src] || []).map((elem, index) => {
          return (
            <path key={index} d={elem} fill={fill}/>
          )
        })
      }
      {
        rects[src] && rects[src]?.length ?
        (rects[src] || []).map((elem, index) => {
          return (
            <rect
              key={index}
              x={elem['x'] || '0'}
              y={elem['y'] || '0'}
              width={elem['width'] || '0'}
              height={elem['height'] || '0'}
            />
          )
        })
        :
        <></>
      }
    </svg>
  )
}

export default Icon;
