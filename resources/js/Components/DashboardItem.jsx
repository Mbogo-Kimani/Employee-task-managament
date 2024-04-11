import React from 'react'
import Icon from './Icon'

function DashboardItem({ numberToDisplay, textToDisplay, pictureSrc, href }) {
  return (
    <div className='border shadow-lg bg-white rounded-md flex flex-col mx-4 my-4 h-[220px]'>
      <div className='h-[80%] w-full flex justify-between items-center py-6 px-8 text-sm'>
        <div>
          <h4 className="text-red-500 mx-2">{ numberToDisplay || '' }</h4>
          <p className="tracking-wider mb-0 mx-2">{ textToDisplay }</p>
        </div>
        <div className="flex-shrink-0 my-3">
          <div>
            <Icon
              className="h-[70px] w-[70px]"
              src={ pictureSrc }
              alt=""
            />
          </div>
        </div>
      </div>
          
      <div className='bg-gray-300 h-[20%]'>
        <a className="" href={ href }>
          <div className="flex justify-between items-center px-8 py-4 text-sm">
            <p className="mb-0">View Details</p>
            <Icon className='h-[10px] w-[10px]' src='/icons/caret-up.svg'/>
          </div>
        </a>
      </div>
    </div>
  )
}

export default DashboardItem