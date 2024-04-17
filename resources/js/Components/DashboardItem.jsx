import React from 'react'
import Icon from './Icon'

function DashboardItem({ numberToDisplay, textToDisplay, pictureSrc, href }) {
  return (
    <div className='border shadow-lg bg-white rounded-md flex flex-col mx-4 my-4 w-[180px]'>
      <div className='w-full flex justify-between items-center py-6 px-3 text-sm h-[100px]'>
        <div className='flex flex-col'>
          <h4 className="text-red-500 mx-2">
            { parseFloat(numberToDisplay) !== NaN ? numberToDisplay : '' }
          </h4>
          <p className="tracking-wider mb-0 mx-2">{ textToDisplay }</p>
        </div>
        <div className="flex-shrink-0 my-3">
          <div>
            {
              pictureSrc ?
              <Icon
                className="h-[50px] w-[50px]"
                src={ pictureSrc }
                alt=""
              />
              : 
              <></>
            }
          </div>
        </div>
      </div>
          
      <div className='bg-gray-300 py-2'>
        <a className="" href={ href }>
          <div className="flex justify-between items-center px-4 py-1 text-sm">
            <p className="mb-0 hover:text-[var(--purple)]">View Details</p>
            <Icon className='h-[7px] w-[7px]' src='/icons/caret-up.svg'/>
          </div>
        </a>
      </div>
    </div>
  )
}

export default DashboardItem