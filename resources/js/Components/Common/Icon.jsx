import React, { useState } from 'react'
import { icons, viewBox } from '../../data/icons'
import { rects } from '../../data/rects'
import PictureComp from './PictureComp'

function Icon({ src, fill = '#333', viewBoxCustom = '0 0 512 512', className = '', onClick = () => {}, imgClassName = '', title = '' }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  if (src.indexOf('.') > 0) {
    return (
      <PictureComp 
        src={src}
        imgClassName={imgClassName}
        className={className}
        onClick={onClick}
        title={title}
      />
    )
  }

  return (
    <div className='relative' onMouseOver={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)}>
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
          }) :
          <></>
        }
      </svg>

      {
        tooltipVisible &&
        <div className='inline absolute top-[125%] left-0 w-fit px-2 bg-gray-800 text-gray-100 z-[500]'>
          <p style={{ whiteSpace: 'nowrap' }}>{ title }</p>
        </div>
      }
    </div>
  )
}

export default Icon;
