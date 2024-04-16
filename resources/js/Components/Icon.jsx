import React from 'react'

function Icon({ imgClassName = '', className = '', src, onClick }) {
  return (
    <div className={`${className}`} onClick={onClick}>
      <img src={src} alt="icon" className={`${imgClassName}`}/>
    </div>
  )
}

export default Icon