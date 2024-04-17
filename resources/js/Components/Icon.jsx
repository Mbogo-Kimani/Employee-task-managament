import React from 'react'

function Icon({ imgClassName = '', className = '', src, onClick }) {
  return (
    <div className={`${className} flex justify-center items-center`} onClick={onClick}>
      <img src={src} alt="icon" className={`${imgClassName}`}/>
    </div>
  )
}

export default Icon