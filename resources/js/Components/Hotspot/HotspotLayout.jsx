// src/components/Layout.js
import React, { useContext, useEffect, useState } from 'react';
import Icon from '../Common/Icon';
import { Link, router } from '@inertiajs/react';
import { toast } from 'react-toastify';
import requestHandler from '../../services/requestHandler';
import { AppContext } from '../../appContext';

const Layout = ({ children }) => {
  // State to control sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHotspotOpen, setIsHotspotOpen] = useState(false);
  const [isClientsOpen, setIsClientsOpen] = useState(false);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [isFinancesOpen, setIsFinancesOpen] = useState(false);
  const { userData, logoutUser } = useContext(AppContext);
  
  useEffect(() => {
    checkLogin();
    updateSidebarState(location.pathname); // **Update sidebar on route change**
  }, [location.pathname]);

  function checkLogin() {
    if (!userData) {
      toast.error('You are not logged in');
      window.location.href = "/auth/login";
    }
  }

  const updateSidebarState = (path) => {
    // Automatically expand the section containing the active link
    setIsHotspotOpen(path.startsWith('/sessions'));
    setIsClientsOpen(path.startsWith('/hotspot/client') || path.startsWith('/hotspot/clients'));
    setIsPackagesOpen(path.startsWith('/hotspot/plan/new') || path.startsWith('/hotspot/plans'));
    setIsFinancesOpen(path.startsWith('/hotspot/transactions'));
  };

  const isActive = (path) => location.pathname.startsWith(path);  // Updated to use startsWith

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) setIsSidebarOpen(false);  // Close sidebar on mobile
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Mobile Toggle Button */}
      {/* <div className="md:hidden p-4  text-white w-full"> */}
      <button
        className='md:hidden p-4 absolute text-gray focus:outline-none'
        onClick={() => setIsSidebarOpen(true)}
      >
        <Icon src='burger' className='w-4 mr-2' fill='rgb(34 197 94)' />
      </button>
      {/* </div> */}

      {/* Sidebar (Hidden on mobile, static on larger screens) */}
      <aside
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block fixed md:relative z-50 inset-0 md:inset-auto md:w-48 bg-blue-800 text-white`}
      >
        <div className='p-4 text-lg font-bold'>ETNET HOTSPOT</div>
        <nav className='flex flex-col flex-grow'>
          <Link href='/hotspot/dashboard' className={`py-2 px-4 hover:bg-blue-700 mb-1 ${isActive('/hotspot/dashboard') ? 'bg-blue-700' : ''}`} // Updated with isActive check
          >
            Dashboard
          </Link>
          <div className='mb-1'>
            <button
              className={`py-2 px-4 hover:bg-blue-700 w-full flex justify-between items-center ${isHotspotOpen && 'bg-blue-700'}`}
              onClick={() => setIsHotspotOpen(!isHotspotOpen)}
            >
              Hotspot
              <span>{isHotspotOpen ? '-' : '+'}</span>
            </button>
            {isHotspotOpen && (
              <div className='bg-blue-700'>
                {/* <Link
                  href='/hotspot/settings'
                  className={`py-2 px-8 hover:bg-blue-600 block ${isActive('/hotspot/settings') ? 'bg-blue-600' : ''}`} // Updated with isActive check
                >
                  Access Points
                </Link> */}
                <Link
                  href='/sessions/active'
                  className={`py-2 px-8 hover:bg-blue-600 block ${isActive('/sessions/active') ? 'bg-blue-600' : ''}`} // Fixed path and added isActive check
                >
                  Active Sessions
                </Link>
              </div>
            )}
          </div>
          <div className='mb-1'>
            <button
              className={`py-2 px-4 hover:bg-blue-700 w-full flex justify-between items-center ${isClientsOpen && 'bg-blue-700'}`}
              onClick={() => setIsClientsOpen(!isClientsOpen)}
            >
              Clients
              <span>{isClientsOpen ? '-' : '+'}</span>
            </button>
            {isClientsOpen && (
              <div className='bg-blue-700'>
                <Link
                  href='/hotspot/client/new'
                  className={`py-2 px-8 hover:bg-blue-600 block ${isActive('/hotspot/client/new') ? 'bg-blue-600' : ''}`} // Updated with isActive check
                >
                  Add
                </Link>
                <Link
                  href='/hotspot/clients'
                  className={`py-2 px-8 hover:bg-blue-600 block ${isActive('/hotspot/clients') ? 'bg-blue-600' : ''}`} // Updated with isActive check
                >
                  List
                </Link>
              </div>
            )}
          </div>
          <div className='mb-1'>
            <button
              className={`py-2 px-4 hover:bg-blue-700 w-full flex justify-between items-center ${isPackagesOpen && 'bg-blue-700'}`}
              onClick={() => setIsPackagesOpen(!isPackagesOpen)}
            >
              Packages
              <span>{isPackagesOpen ? '-' : '+'}</span>
            </button>
            {isPackagesOpen && (
              <div className='bg-blue-700'>
                <Link
                  href='/hotspot/plan/new'
                  className={`py-2 px-8 hover:bg-blue-600 block ${isActive('/hotspot/plan/new') ? 'bg-blue-600' : ''}`} // Updated with isActive check

                >
                  Add
                </Link>
                <Link
                  href='/hotspot/plans'
                  className={`py-2 px-8 hover:bg-blue-600 block ${isActive('/hotspot/plans') ? 'bg-blue-600' : ''}`} // Updated with isActive check
                >
                  List
                </Link>
              </div>
            )}
          </div>
          <div className='mb-1'>
            <button
              className={`py-2 px-4 hover:bg-blue-700 w-full flex justify-between items-center ${isFinancesOpen && 'bg-blue-700'}`}
              onClick={() => setIsFinancesOpen(!isFinancesOpen)}
            >
              Finances
              <span>{isFinancesOpen ? '-' : '+'}</span>
            </button>
            {isFinancesOpen && (
              <div className='bg-blue-700'>
                <Link
                  href='/hotspot/transactions'
                  className={`py-2 px-8 hover:bg-blue-600 block ${isActive('/hotspot/transactions') ? 'bg-blue-600' : ''}`} // Updated with isActive check
                >
                  Mpesa Transactions
                </Link>
                {/* <a
                  href='/hotspot/active'
                  className='py-2 px-8 hover:bg-blue-600 block'
                >
                  Active Sessions
                </a> */}
              </div>
            )}
          </div>
          {/* <Link href='/settings' className={`py-2 px-4 hover:bg-blue-700 mb-1 ${isActive('/settings') ? 'bg-blue-700' : ''}`}>
            Reports
           </Link>
          <a href='/hotspot/tickets' className={`py-2 px-4 hover:bg-blue-700 ${isActive('/hotspot/tickets') ? 'bg-blue-700' : ''}`}> {/* Updated with isActive check */}
            {/* Tickets */}
          {/* </a> */}
          <Link
            href='/dashboard'
            className='absolute py-2 px-4 hover:bg-blue-700 bottom-5 flex'
          >
            Logout
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
              className='w-6 h-6 ml-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1'
              />
            </svg>
          </Link>
        </nav>

        {/* Close button for mobile */}
        <button
          className='md:hidden absolute top-4 right-4 text-white'
          onClick={() => setIsSidebarOpen(false)}
        >
          Close
        </button>
      </aside>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black opacity-50'
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className='flex-grow md:p-6 py-16 px-6 bg-white '>
        {children}
      </div>
    </div>
  );
};

export default Layout;
