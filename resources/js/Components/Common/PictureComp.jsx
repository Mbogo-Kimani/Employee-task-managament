import React from 'react'

function PictureComp({ imgClassName = '', className = '', src, onClick = () => {} }) {
  return (
    <div className={`${className} flex justify-center items-center`} onClick={onClick}>
      <img src={src} alt="icon" className={`${imgClassName}`}/>
    </div>
  )
}

export default PictureComp;
