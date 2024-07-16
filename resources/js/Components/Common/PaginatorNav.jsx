import React from 'react';
import { handlePage } from '../../data/utils';
import { router } from '@inertiajs/react';

function PaginatorNav({ state, setState }) {
  function handlePageNavigation (navigation) {
    const nextPageNavigate = navigation !== 'prev';
    const searchParam = location.search.split('=')[1];

    if (searchParam) {
      const currentPage = parseInt(searchParam);
      
      if (nextPageNavigate && state.next_page_url) router.visit(`${location.pathname}?page=${currentPage + 1}`);
      else if (!nextPageNavigate && state.prev_page_url) router.visit(`${location.pathname}?page=${currentPage - 1}`);
      else return;
    } else {
      if (nextPageNavigate) router.visit(`${location.pathname}?page=2`);
      else return;
    }
  }
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
          onClick={() => handlePageNavigation('prev')}
        >
          Previous
        </li>
        {
          state.current_page - 2 > 0 &&
          <li className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
            { state.current_page - 2 }
          </li>
        }
        {
          state.current_page - 1 > 0 &&
          <li className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
            { state.current_page - 1 }
          </li>
        }

        <li className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-200 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
          { state.current_page }
        </li>
      
        {
          state.current_page + 1 <= state.last_page &&
          <li className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
            { state.current_page + 1 }
          </li>
        }
        {
          state.current_page + 2 <= state.last_page &&
          <li className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
            { state.current_page + 2 }
          </li>
        }
       <li
          className={
            state.next_page_url ?
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" :
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-300 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default"
          }
          onClick={() => handlePageNavigation('next')}
        >
          Next
        </li>
      </ul> 
    </nav>
  )
}

export default PaginatorNav;
