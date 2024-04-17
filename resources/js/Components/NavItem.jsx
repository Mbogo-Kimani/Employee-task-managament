import React, { useState } from 'react';
import Icon from './Icon';

function NavItem({ src, name, hasOptions, options = [], collapsed, onClick }) {
  const [showOptions, setShowOptions] = useState(false);

  const handleItemClick = () => {
    if (collapsed) {
      onClick(); // Execute the onClick function passed from the parent component
    } else {
      setShowOptions(!showOptions); // Toggle the display of options if not collapsed
    }
  };

  return (
    <li className={!showOptions && collapsed ? 'hover:bg-blue-100' : ''}>
      <div className='flex items-center pl-3 pr-4 py-2 cursor-pointer' onClick={handleItemClick}>
        {collapsed ? (
          src && <Icon src={src} className="opacity-70 mr-3 h-[20px] w-[20px] z-0"/>
        ) : (
          <>
            {src && <Icon src={src} className="opacity-70 mr-3 h-[20px] w-[20px] z-0"/>}
            <span className='mx-2'>{ name }</span>
            {hasOptions && (
              <span className={`${showOptions ? 'rotate-[-90deg]' : ''} ml-auto`}>
                {'<'}
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
