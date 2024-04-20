import React from 'react'
import Icon from './Common/Icon'
import { Link } from '@inertiajs/react'

function DashboardItem({ numberToDisplay, textToDisplay, pictureSrc, href }) {
  return (
    <Link href={ href } className='shadow-lg relative bg-white dark:bg-gray-700 dark:text-gray-100 hover:scale-105 rounded-md flex flex-col mx-4 my-4 w-[180px]'>
      {
        parseFloat(numberToDisplay) ? 
        <div className='h-7 w-7 rounded-full bg-red-500 flex justify-center items-center absolute right-[-5px] top-[-5px]'>
          <h4 className="text-gray-100 mx-2">
            { parseFloat(numberToDisplay) !== NaN ? numberToDisplay : '' }
          </h4>
        </div>
        :
        <></>
      }
      <div className='w-full flex justify-center items-center py-6 px-3 text-sm h-[100px]'>
        <div className="flex-shrink-0 my-3 mx-3">
          <div>
            {
              pictureSrc ?
              <Icon
                className="me-3 w-8 h-8"
                src={ pictureSrc }
                alt=""
              />
              : 
              <></>
            }
          </div>
        </div>
        <div className='flex flex-col my-3 mx-3'>
          {/* <h4 className="text-red-500 mx-2">
            { parseFloat(numberToDisplay) !== NaN ? numberToDisplay : '' }
          </h4> */}
          <p className="tracking-wider mb-0 mx-2">{ textToDisplay }</p>
        </div>
      </div>
          
      {/* <div className='bg-gray-300 py-2'>
        <div className="" >
          <div className="flex justify-between items-center px-4 py-1 text-sm">
            <p className="mb-0 hover:text-[var(--purple)]">View Details</p>
            <Icon className='h-[7px] w-[7px] opacity-80' src='/icons/caret-up.svg'/>
          </div>
        </div>
      </div> */}
    </Link>

  )
}

export default DashboardItem