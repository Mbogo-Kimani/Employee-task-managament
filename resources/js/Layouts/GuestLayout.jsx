import React from 'react'
import '../../css/Layouts/GuestLayout.css';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function GuestLayout({ children }) {
  return (
    <div className='overflow-x-hidden'>
      <Header />
      <div className='pt-[63px]'>
        { children }
      </div>
      <Footer />
    </div>
  )
}

export default GuestLayout;
