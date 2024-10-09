import React from 'react'
import Icon from './Common/Icon'
import "../../css/Pages/home/Footer.css"

function Footer() {
  return (
    <footer id="footer" className="footer-bg-3">
      <div className="text-gray-100 py-10 px-8 mb-[2.5rem]">
        <div className="">
          <div className="flex justify-center md:justify-between items-center flex-wrap text-center md:text-left">
            <div className="w-full md:w-auto mb-[1.9rem]] md:mb-0 flex justify-center flex-col">
              <h3 className="font-bold text-[1.9rem] leading-10 text-white">Our Solutions</h3>
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
              <span>Copyright &copy; {new Date().getFullYear()}</span>
              <a href="#"> ETNET </a>
              <span>
                All Rights Reserved 
                <a href="privacy_policy.html" target="_blank"> Privacy Policy</a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div id="scrollButton" className="fixed bottom-6 right-6 z-50 transition-opacity duration-300 transform translate-y-2 mb-0">
        <button onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} className='flex justify-center items-center bg-[var(--orange)] py-2 px-5 rounded-full hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500'>
          <Icon src='arrowTop' className='w-4 h-4' fill='#222'/>
        </button>
      </div>
    </footer>
  )
}

export default Footer;
