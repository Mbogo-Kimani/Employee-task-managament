import React, { useEffect, useState, useContext } from 'react';
import NavItem from '../Components/NavItem';
import requestHandler from '../services/requestHandler';
import { Link, router } from '@inertiajs/react';
import Icon from '../Components/Common/Icon';
import Badge from '../Components/Common/Badge';
import { useTranslation } from 'react-i18next';
import {changeLanguage} from '../i18n'
import { AppContext } from '../appContext';
import { navItemsDeterminer, pageData as defaultPageData } from '../data/indexNav';


function SideNav({ link = '/dashboard', children }) {
  const [collapsed, setCollapsed] = useState(hasLargeWidth());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [response, setResponse] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en')
  const [navItems, setNavItems] = useState(defaultPageData);
  const { userData, logoutUser } = useContext(AppContext);
  
  useEffect(() => {
    checkLogoutResponse();
  }, [response]);

  useEffect(() => {
    fetchUnreadNotificationCount();
  }, []);

  useEffect(() => {
    changeLanguage(language);
    localStorage.setItem('language',language)
  }, [language]);

  useEffect(() => {
    setNavItems(
      navItemsDeterminer(userData?.role, userData?.clearance_level)
    );
  }, []);
  
  const {t} = useTranslation()

  function fetchUnreadNotificationCount() {
    requestHandler.get('/api/unread_notifications_count', setNotificationsCount);
  }
  const switchLanguage = () => {
    setLanguage(language == 'en' ? 'zh' : 'en')
    window.location.reload()
  }
  function checkLogoutResponse() {
    if (response) {
      logoutUser();
      router.visit('/auth/login');
    }
  }

  function navigateToLogout() {
    requestHandler.post('/api/logout', null, setResponse);
  }

  function navigateToProfile() {
    router.visit('/profile');
  }

  function hasLargeWidth() {
    return window.innerWidth < 640;
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  function getFirstName(elem) {
    if (elem && elem.name) return elem.name.split(' ')[0];
    else return '';
  }

  return (
    <div className={`flex flex-col bg-gray-100 dark:bg-gray-900 min-h-screen relative ${collapsed ? 'collapsed' : ''}`}>
      <nav className='bg-white dark:bg-gray-800 h-[50px] w-full text-gray-900 dark:text-gray-100 flex items-center fixed z-10 shadow-md'>
        <Icon src='burger' className='w-[20px] h-[20px] hover:bg-gray-100 hover:text-[var(--purple)] ml-4 cursor-pointer' onClick={toggleCollapse} />
        <Link className='ml-4 w-[100px] h-[auto] block my-auto' href="/dashboard">
          <Icon src="/images/etnet.png" alt="Dashboard Image"/>
        </Link>
        <div className="flex grow"/>
        <Link className='w-[40px] h-[auto] block my-auto relative' href="/notifications">
          <Badge numberToDisplay={notificationsCount} size={'5px'} className='right-[-0.5rem] top-[-0.5rem] z-10' textClassName='text-xs px-1.5'/>
          <Icon src="notification" alt="Dashboard Notiifcations" className='w-[20px] h-[20px] hover:bg-gray-100 hover:text-[var(--purple)] ml-4 cursor-pointer'/>
        </Link>
        <div className="relative">
          <div className="flex items-center cursor-pointer px-3 py-2 mx-6" onClick={toggleDropdown}>
            <span className="mr-3">{ getFirstName(userData) }</span>
            <svg
              className={`w-3 h-3  transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
         
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow">
              <ul className="py-2 text-sm text-gray-700">
              <li>
                  <button className='block px-4 py-2 hover:bg-gray-100 w-full text-left' onClick={navigateToProfile}>{t('profile')}</button>
                </li>
                <li>
                  <button className='block px-4 py-2 hover:bg-gray-100 w-full text-left' onClick={switchLanguage}>{language == 'en' ? '切换语言' : 'Switch Language'}</button>
                </li>
                <li>
                  <button className='block px-4 py-2 hover:bg-gray-100 w-full text-left' onClick={navigateToLogout}>{t('logout')}</button>
                </li>
                
              </ul>
            </div>
          )}
        </div>
      </nav>
      <div className='flex pt-[50px]'>
        <nav className={`shadow-sm bg-white dark:bg-gray-800 dark:text-gray-100 min-h-screen w-[${collapsed ? '50' : '200'}px] transition-all duration-300 ease-in-out`}>
          <ul>
            <NavItem
              src="home"
              name="Home"
              href={`/dashboard`}
              collapsed={collapsed}
            />
            {(Array.isArray(navItems) ? navItems : []).map(item => (
              <NavItem
                key={item.name}
                src={item.icon}
                name={item.name}
                hasOptions={item.hasOptions}
                options={item.options}
                href={item.href}
                collapsed={collapsed}
              />
            ))}
          </ul>
        </nav>
        <div className='pt-8 px-8 w-full bg-gray-100 dark:bg-gray-800 overflow-x-hidden'>
          {
            location.pathname !== '/dashboard' &&
            <div className='hover:scale:105 hover:text-green-500 cursor-pointer mb-5'>
              <Link className='hover:underline' href={link}>
                {'<'} Back
              </Link>
            </div>
          }
          { children }
        </div>
      </div>
    </div>
  )
}

export default SideNav;
