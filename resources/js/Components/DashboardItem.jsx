import React from 'react'
import Icon from './Common/Icon'
import { Link } from '@inertiajs/react'
import Badge from './Common/Badge'

function DashboardItem({ numberToDisplay, textToDisplay, pictureSrc, href }) {
  return (
    <Link href={ href } className='shadow-lg relative bg-white dark:bg-gray-700 dark:text-gray-100 hover:scale-105 rounded-md flex flex-col mx-4 my-4 w-[180px]'>
      <Badge numberToDisplay={numberToDisplay} />
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
          <p className="tracking-wider mb-0 mx-2">{ textToDisplay }</p>
        </div>
      </div>
    </Link>

  )
}

export default DashboardItem