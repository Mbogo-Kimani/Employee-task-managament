import React from 'react'
import { handlePage } from '../../data/utils';

function PaginatorNav({ state, setState }) {
  return (
    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-2" aria-label="Table navigation">
       <span className="text-sm font-normal text-gray-500 dark:text-gray-400 pl-3 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white"> {state.current_page} - { state.last_page }</span> of <span className="font-semibold text-gray-900 dark:text-white">{ state.total }</span></span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li
          className={
            state.prev_page_url ?
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" :
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-300 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default"
          }
          onClick={() => handlePage(state.prev_page_url, setState)}
        >
          Previous
        </li>
        <li className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
          { state.current_page }
        </li>
      
       <li
          className={
            state.next_page_url ?
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" :
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-300 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default"
          }
          onClick={() => handlePage(state.next_page_url, setState)}
        >
          Next
        </li>
      </ul> 
    </nav>
  )
}

export default PaginatorNav;
