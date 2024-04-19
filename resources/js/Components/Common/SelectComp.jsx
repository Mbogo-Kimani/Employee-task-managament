import React from 'react'

function SelectComp({ id = '', name, className, value, onChange, required = false, children }) {
  return (
    <div className='custom-select'>
      <select id={id} name={name} className={` ${className}`} value={value} onChange={onChange} required={required}>
        { children }
      </select>
    </div>
  )
}

export default SelectComp;
