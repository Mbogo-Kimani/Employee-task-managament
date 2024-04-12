import React, { useState } from 'react'
import Icon from './Icon'

function NavItem({ src, name, hasOptions, options = [] }) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <li className='hover:bg-blue-100'>
      <div className='flex items-center pl-3 pr-4 py-2 cursor-pointer' onClick={() => setShowOptions(!showOptions)}>
        <Icon src={src} className="opacity-70 mr-3 h-[15px] w-[15px]"/>
        <span className='mx-2'>{ name }</span>
        {
          hasOptions ?
          <span className={`${showOptions ? 'rotate-[-90deg]' : ''} ml-auto`}>
            {'<'}
          </span> :
          <></>
        }
      </div>
      <ul className='mx-5'>
        {
          options && options.length && showOptions ?
          options.map(option => {
            return (
              <li key={option.name} className='my-3 hover:bg-blue-100'>
                <option value={option.name}>{option.name}</option>
              </li>
            )
          })
          :
          <></>
        } 
      </ul>
    </li>
  )
}

export default NavItem