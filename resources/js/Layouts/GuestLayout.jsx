import React from 'react'
import '../../css/Layouts/GuestLayout.css';
import Icon from '../Components/Common/Icon';

function GuestLayout({ children }) {
  return (
    <div>
      <header id="header" className="header header-type1 bg-header-s1 bg-color">
        <div className="container py-4">
            <div className="flex-header flex">
                <div id="logo" className="logo d-flex align-items-center justify-content-start">
                    <a href="index.html" title="Logo">
                      <img src="/images/logo/logo.png" alt="images" data-retina="images/logo/logo.png"/>
                    </a>
                </div>
                <div className="content-menu d-flex align-items-center justify-content-end">
                    <div className="nav-wrap">
                        <div className="btn-menu"><span></span></div>
                        <nav id="mainnav" className="mainnav">
                            <ul className="menu flex items-center justify-around w-full">
                                <li>
                                  <a
                                    href="/index"
                                    className={`${location.pathname === '/' ? 'text-cyan-500' : ''} hover:text-cyan-500`}
                                  >
                                    Home
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="/products"
                                    className={`${location.pathname === '/products' ? 'text-cyan-500' : ''} hover:text-cyan-500`}
                                  >
                                    Our Solutions
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="/blogs"
                                    className={`${location.pathname === '/blog' ? 'text-cyan-500' : ''} hover:text-cyan-500`}
                                  >
                                    Blog
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="/about-us"
                                    className={`${location.pathname === '/aboutus' ? 'text-cyan-500' : ''} hover:text-cyan-500`}
                                  >
                                    About Us
                                  </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="flat-appointment btn-linear hv-linear-gradient">
                        <a href="contact.html" className="font-style linear-color border-corner">Contact Us</a>
                    </div>
                </div>
            </div>
        </div>
      </header>

      <div>
        { children }
      </div>

      <footer id="footer" className="footer-bg-3">
        <div className="overlay"></div>
            <div id="footer-widget" className="footer-widget-type2">
                <div className="container">
                    <div className="flex justify-between">
                        <div className="">
                            <div className="">
                                <h3 className="widget widget-title text-white">Our Solutions</h3>
                                <div className="widget-services sm:flex">
                                    <ul className="one-half">
                                        <li><a href="#">SmartHome systems</a></li>
                                        <li><a href="#">Internet Services</a></li>
                                        <li><a href="#">CCTV Installation</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="mg-widget-mobi kcl-widget">
                                <h3 className="widget widget-title text-white">Get in Touch with US</h3>
                                <div className="flex mb-4">
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
                        <div className="">
                            <div className="">
                                <h3 className="widget widget-title text-white">Subscribe Us</h3>
                                <form action="#" className="hv-linear-gradient flex flex-col">
                                    <input type="text" className="bg-transparent border rounded p-4 w-[250px] mb-8" placeholder="Email here" />
                                    <button className="hover:bg-gradient-to-r hover:from-cyan-500 hover:to-green-500 font-style linear-color py-4 rounded-xl">Send Now</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="bottom" className="bottom-type2">
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
            <a id="scroll-top" className="show text-xl font-bold flex justify-center items-center text-white text-[20px] font-bold">
              <span className='mb-0'>^</span>
            </a>
        </footer>
    </div>
  )
}

export default GuestLayout;
