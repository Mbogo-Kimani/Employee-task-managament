import React from 'react'

function PictureComp({ imgClassName = '', className = '', src, onClick = () => {}, title = '' }) {
  return (
    <div className={`${className} flex justify-center items-center`} onClick={onClick} title={title}>
      <img src={src} alt="icon" className={`${imgClassName}`}/>
    </div>
  )
}

export default PictureComp;
