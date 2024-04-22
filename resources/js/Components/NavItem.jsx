import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Icon from './Common/Icon';

function NavItem({ src, name, hasOptions, options = [], href = '#', collapsed }) {
  const [showOptions, setShowOptions] = useState(false);

  function handleOptions() {
    if (hasOptions && options.length) setShowOptions(!showOptions);
    else router.visit(href);
  }

  function isActive() {
    return location.pathname === href;
  }

  return (
    <li className={!showOptions && collapsed ? 'hover:bg-blue-100' : ''}>
      <div className={`flex items-center pl-3 pr-4 py-2 cursor-pointer ${isActive() ? 'bg-gray-100' : ''}`} onClick={handleOptions}>
        {collapsed ? (
          src && <Icon src={src} className="mr-3 h-[20px] w-[20px] z-0" fill='var(--luminous-green)'/>
        ) : (
          <>
            {src && <Icon src={src} className="mr-3 h-[20px] w-[20px] z-0" fill='var(--luminous-green)'/>}
            <span className={`mx-2 ${isActive() ? 'text-[var(--luminous-green)]' : ''}`}>{ name }</span>
            {hasOptions && (
              <span className={`${showOptions ? 'rotate-[-90deg]' : ''} ml-auto`}>
                <Icon src='caretUp' className='h-[10px] w-[10px] rotate-[-90deg] transition-all ease-in'/>
              </span>
            )}
          </>
        )}
      </div>
      <ul className='px-5'>
        {
          options && options.length && showOptions ?
          options.map(option => {
            return (
              <li key={option.name} className='my-3 hover:bg-blue-100 w-full'>
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

export default NavItem;
