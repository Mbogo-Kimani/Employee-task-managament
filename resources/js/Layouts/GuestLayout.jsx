import React, { useState } from 'react'
import '../../css/Layouts/GuestLayout.css';
import Icon from '../Components/Common/Icon';

function GuestLayout({ children }) {
  const [collapseNav, setCollapseNav] = useState(false);
  return (
    <div className='overflow-x-hidden'>
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
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
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
                <li >
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
                <li>
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
                <li>
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
                <li>
                  <a
                    href="/contact.html"
                    className={`
                      ${location.pathname === '/contact.html' ?
                      'font-bold text-[var(--orange)] md:text-[var(--orange)] dark:text-gray-100 md:dark:text-blue-500 md:px-2 md:py-0 rounded' : 
                      'text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500 md:p-0'}
                      block py-2 px-3 hover:scale-105`}
                    aria-current="page"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </header>

      <div className='pt-[63px]'>
        { children }
      </div>

      <footer id="footer" className="footer-bg-3">
        <div className="overlay"></div>
            <div className="text-gray-100 py-10 px-8 mb-[40px]">
                <div className="">
                    <div className="flex justify-center md:justify-between items-center flex-wrap text-center md:text-left">
                        <div className="w-full md:w-auto mb-[30px] md:mb-0 flex justify-center flex-col">
                          <h3 className="font-bold text-[30px] leading-10 text-white">Our Solutions</h3>
                          <div className="flex justify-center">
                            <ul className="text-gray-300 flex flex-col justify-right">
                              <li><a href="#">SmartHome systems</a></li>
                              <li><a href="#">Internet Services</a></li>
                              <li><a href="#">CCTV Installation</a></li>
                            </ul>
                          </div>
                        </div>

                        <div className="w-full md:w-auto my-6 md:my-0 ">
                          <div className="mg-widget-mobi kcl-widget">
                            <h3 className="text-[28px] font-bold text-white py-2">Get in Touch with Us</h3>
                            <div className="flex mb-4 justify-center">
                              <a href="#">
                                <div className="border rounded-full mr-2">
                                  <Icon src='facebook' fill='#fff' className='w-8 h-8 p-2'/>
                                </div>
                              </a>
                              <a href="#" className=''>
                                <div className="border rounded-full mx-2">
                                  <Icon src='instagram' fill='#fff' className='w-8 h-8 p-2'/>
                                </div>
                              </a>
                              <a href="#">
                                <div className="border rounded-full mx-2">
                                  <Icon src='twitter' fill='#fff' className='w-8 h-8 p-2'/>
                                </div>
                              </a>
                            </div>
                            <ul className='text-gray-50'>
                              <li>Email: sales@etnet.co.ke</li>
                              <li>Phone: 0791012345</li>
                              <li>www.etnet.co.ke</li>
                            </ul>
                          </div>
                        </div>

                        <div className="w-full md:w-auto my-6 flex flex-col justify-center items-center">
                          <h3 className="font-bold text-[27px] text-white mb-4">Subscribe Us</h3>
                          <form action="#" className="hv-linear-gradient flex flex-col">
                            <input type="text" className="bg-transparent border rounded p-4 w-[250px] mb-8" placeholder="Email here" />
                            <button className="hover:bg-gradient-to-r hover:from-cyan-500 hover:to-green-500 font-style linear-color py-4 rounded-xl">Send Now</button>
                          </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="bottom" className="bg-[#0d2235]">
                <div className="">
                    <div className="bottom-wrap text-center text-xl font-medium">
                        <div id="copyright">
                          <span>Copyright © 2024</span>
                          <a href="#"> ETNET </a>
                          <span>
                            All Rights Reserved 
                            <a href="privacy_policy.html" target="_blank"> Privacy Policy</a>
                          </span>
                        </div>
                    </div>
                </div>
            </div>
            <a id="scroll-top" className="show text-xl font-bold flex justify-center items-center text-white text-[20px] font-bold" href='#header'>
              <span className='mb-0'>^</span>
            </a>
        </footer>
    </div>
  )
}

export default GuestLayout;
