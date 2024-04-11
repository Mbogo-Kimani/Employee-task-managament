import React from 'react'

function Icon({ imgClassName = '', className = '', src }) {
  return (
    <div className={`${className}`}>
      <img src={src} alt="icon" className={`${imgClassName}`}/>
    </div>
  )
}

export default Icon