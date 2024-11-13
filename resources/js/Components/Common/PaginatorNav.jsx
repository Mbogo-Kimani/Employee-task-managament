import React, { useState } from 'react';
import { handlePage } from '../../data/utils';
import { router } from '@inertiajs/react';
import Modal from './Modal';
import { loaderSetter } from './Loader';

function PaginatorNav({ state, setState, navigateByParams = false, searchParam='', filters={}}) {
  const [seeAllPages, setSeeAllPages] = useState(false);
 
  
  function handlePageNavigation (navigation) {
    const nextPageNavigate = navigation !== 'prev';
    const allSearchParams = location.search.split('&');
    let pageParam = 1;

    if (allSearchParams[0]) {
      pageParam = allSearchParams[0].split('=')[1];
    }

    if (searchParam) {
      const currentPage = parseInt(pageParam);
      
      if (nextPageNavigate && state.next_page_url) router.visit(`${location.pathname}?page=${currentPage + 1}&search=${searchParam}&filters=${filters}`);
      else if (!nextPageNavigate && state.prev_page_url) router.visit(`${location.pathname}?page=${currentPage - 1}&search=${searchParam}&filters=${filters}`);
      else return;
    } else {
      if (nextPageNavigate && navigateByParams) router.visit(`${location.pathname}?page=2`);
      else if (nextPageNavigate && !navigateByParams) handlePage(state.next_page_url, setState,loaderSetter);
      else if (!nextPageNavigate && !navigateByParams) handlePage(state.prev_page_url, setState,loaderSetter);
      else return;
    }
  }

  function handleSpecificPageNav(page) {
    const filterParams = new URLSearchParams(filters);
    
    if (navigateByParams)  router.visit(`${location.pathname}?page=${page}&search=${searchParam}&${filterParams.toString()}`); 
    else handlePage(`${state.path}?page=${page}&search=${searchParam}&filters=${filterParams.toString()}`, setState);
    hideAllPages();
  }

  const displayAllPages = () => setSeeAllPages(true);
  const hideAllPages = () => seeAllPages ? setSeeAllPages(false) : () => {};

  return (
    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-2 px-2" aria-label="Table navigation">
       <span className="text-sm font-normal text-gray-500 dark:text-gray-400 pl-3 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white"> {state.current_page} - { state.last_page }</span> of <span className="font-semibold text-gray-900 dark:text-white">{ state.total }</span></span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-10 pb-3">
        <li
          className={
            state.current_page !== 1 ?
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" :
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-300 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default"
          }
          onClick={() => state.current_page !== 1 ? handleSpecificPageNav(1) : () => {}}
        >
          First Page
        </li>
        <li
          className={
            state.prev_page_url ?
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" :
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-300 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default"
          }
          onClick={() => handlePageNavigation('prev')}
        >
          Previous
        </li>
        {
          state.current_page - 2 > 0 &&
          <li onClick={() => handleSpecificPageNav(state.current_page - 2)} className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white cursor-pointer">
            { state.current_page - 2 }
          </li>
        }
        {
          state.current_page - 1 > 0 &&
          <li onClick={() => handleSpecificPageNav(state.current_page - 1)} className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white cursor-pointer">
            { state.current_page - 1 }
          </li>
        }

        <li className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-200 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
          { state.current_page }
        </li>
      
        {
          state.current_page + 1 <= state.last_page &&
          <li onClick={() => handleSpecificPageNav(state.current_page + 1)} className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white cursor-pointer">
            { state.current_page + 1 }
          </li>
        }
        {
          state.current_page + 2 <= state.last_page &&
          <li onClick={() => handleSpecificPageNav(state.current_page + 2)} className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white cursor-pointer">
            { state.current_page + 2 }
          </li>
        }
        <li
          className={
            state.next_page_url ?
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" :
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-300 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default"
          }
          onClick={() => handlePageNavigation('next')}
        >
          Next
        </li>
        <li
          className={
            state.current_page !== state.last_page ?
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" :
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-300 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default"
          }
          onClick={() => state.current_page !== state.last_page ? handleSpecificPageNav(state.last_page) : () => {}}
        >
          Last Page
        </li>

        <li
          className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'
          onClick={displayAllPages}
        >
          {'>>'}
        </li>
      </ul>

      <Modal show={seeAllPages} onClose={hideAllPages} maxWidth='sm'>
        <div className="px-1 overflow-y-auto w-full">
          <div className="bg-white rounded-lg dark:bg-gray-700">
            <div className="flex items-center justify-between p-2 md:p-3 rounded-t dark:border-gray-600">
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={hideAllPages}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <ul>
              {
                (Array.from({length: state.last_page || 1}, (_, ind) => {
                  return (
                    <li
                      key={ind}
                      className={`shadow py-1 px-1 ${state.current_page === ind + 1 ? 'text-gray-400' : 'hover:bg-green-200 hover:text-gray-900'}`}
                      onClick={() => state.current_page === ind + 1 ? () => {} : handleSpecificPageNav(ind + 1)}
                    >
                      {ind + 1}
                    </li>
                  )
                }))
              }
            </ul>
          </div>
        </div>
      </Modal>
    </nav>
  )
}

export default PaginatorNav;
