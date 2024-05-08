import React from 'react'

function SelectComp({ id = '', name, className, value, onChange = () => {}, onMouseOver = () => {}, required = false, children }) {
  return (
    <div className='flex items-center justify-center'>
      <select id={id} name={name} className={` ${className}`} value={value} onChange={onChange} onMouseOver={onMouseOver} required={required}>
        { children }
      </select>
      <div className='custom-select'></div>
    </div>
  )
}

export default SelectComp;
