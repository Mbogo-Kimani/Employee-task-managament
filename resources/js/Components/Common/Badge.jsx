import React from 'react'

function Badge({ numberToDisplay, className = 'right-[-5px] top-[-5px] z-10', textClassName = 'px-2' }) {
  return (
    <>
			{
        (typeof(numberToDisplay) === 'string' || parseFloat(numberToDisplay)) ? 
        <div className={`rounded-full bg-red-500 flex justify-center items-center absolute ${className}`}>
          <h4 className={`text-gray-100 ${textClassName}`}>
            { typeof(numberToDisplay) === 'string' || parseFloat(numberToDisplay) !== NaN ? numberToDisplay : '' }
          </h4>
        </div>
        :
        <></>
      }
    </>
  )
}

export default Badge;
