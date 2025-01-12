import { Link, router } from '@inertiajs/react';
import React, { useState } from 'react'
import Icon from './Common/Icon';
import DropDown from './Common/DropDown';
import { Menu } from '@headlessui/react';

function Header({ client = null }) {
  const [collapseNav, setCollapseNav] = useState(false);

  return (
    <header id="header" className="">
        <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full z-10 h-[64px] shadow-md rounded">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
            <a href="/index" title="ET NET" className="">
              <img src="/images/etnet.png" alt="images" data-retina="images/etnet.png" className='h-[64px]'/>
            </a>
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setCollapseNav(!collapseNav)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
            <div className={`w-full md:block md:w-auto ${collapseNav ? '' : 'hidden'}`} id="navbar-default">
              <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li className={collapseNav && 'w-[10rem] text-center mb-2'}>
                  <a
                    href="/index"
                    className={`
                      ${location.pathname === '/index' ?
                      'font-bold text-[var(--orange)] md:text-[var(--orange)] dark:text-gray-100 md:dark:text-blue-500 md:px-2 md:py-0 rounded' : 
                      'text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500 md:p-0'}
                      block py-2 px-3 hover:scale-105`}
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li className={collapseNav && 'w-[10rem] text-center mb-2'}>
                  <a
                    href="/products"
                    className={`
                      ${location.pathname === '/products' ?
                      'font-bold text-[var(--orange)] md:text-[var(--orange)] dark:text-gray-100 md:dark:text-blue-500 md:px-2 md:py-0 rounded' : 
                      'text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500 md:p-0'}
                      block py-2 px-3 hover:scale-105`}
                    aria-current="page"
                  >
                    Our Solutions
                  </a>
                </li>
                <li className={collapseNav && 'w-[10rem] text-center mb-2'}>
                  <a
                    href="/blogs"
                    className={`
                      ${location.pathname === '/blogs' ?
                      'font-bold text-[var(--orange)] md:text-[var(--orange)] dark:text-gray-100 md:dark:text-blue-500 md:px-2 md:py-0 rounded' : 
                      'text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500 md:p-0'}
                      block py-2 px-3 hover:scale-105`}
                    aria-current="page"
                  >
                    Blog
                  </a>
                </li>
                <li className={collapseNav && 'w-[10rem] text-center mb-2'}>
                  <a
                    href="/about-us"
                    className={`
                      ${location.pathname === '/about-us' ?
                      'font-bold text-[var(--orange)] md:text-[var(--orange)] dark:text-gray-100 md:dark:text-blue-500 md:px-2 md:py-0 rounded' : 
                      'text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500 md:p-0'}
                      block py-2 px-3 hover:scale-105`}
                    aria-current="page"
                  >
                    About Us
                  </a>
                </li>
                <li className={collapseNav && 'w-[10rem] text-center mb-2'}>
                  <a
                    href="/contact"
                    className={`
                      ${location.pathname === '/contact' ?
                      'font-bold text-[var(--orange)] md:text-[var(--orange)] dark:text-gray-100 md:dark:text-blue-500 md:px-2 md:py-0 rounded' : 
                      'text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500 md:p-0'}
                      block py-2 px-3 hover:scale-105`}
                    aria-current="page"
                  >
                    Contact Us
                  </a>
                </li>
                {
                  client ?
                  <li title={`${client?.client?.name} is logged in`}>
                    <Link
                      // href="/client/connected"
                      className={'text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500 md:p-0 block py-2 px-3 hover:scale-105 flex'}
                      aria-current="page"
                    >
                      <Icon src='circleUser' className='w-[20px] h-[20px]'/>
                      {/* <Icon src='caret' className='mx-2 w-[20px] h-[20px]'/> */}
                      <DropDown src={'caret'}>
                      <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                              active ? 'bg-green-200 text-black' : 'text-gray-900'
                              } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                              onClick={() => router.visit('/client/connected')}
                            >
                              <Icon src='edit' className='w-4 mr-2' fill='rgb(34 197 94)'/>
                              <span className='block py-3 px-2'>Subscriptions</span>   
                            </button>
                          )}
                        </Menu.Item>
                      {/* <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                              active ? 'bg-green-200 text-black' : 'text-gray-900'
                              } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                              // onClick={() => toggleEditTask(task)}
                            >
                              <Icon src='edit' className='w-4 mr-2' fill='rgb(34 197 94)'/>
                              <span className='block py-3 px-2'>Change Device</span>   
                            </button>
                          )}
                        </Menu.Item> */}
                      </DropDown>
                      {/* { client?.client?.name } */}
                    </Link>
                  </li>
                  :
                  <li className='relative w-[10rem] text-center mb-2'>
                    <Link
                      className='block rounded bg-green-500 p-2 text-white'
                      href={`/client/signup`}
                    >
                      Free Trial
                    </Link>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>

      </header>
  )
}

export default Header;
