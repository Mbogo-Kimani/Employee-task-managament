import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import requestHandler from '../services/requestHandler';
import { toast } from 'react-toastify';
import { router } from '@inertiajs/react';

function ClientLayout({ children }) {
  const [client, setClient] = useState(null);

  useEffect(() => {
    getClientInfo();
  }, []);

  function getClientInfo() {
    requestHandler.get('/api/get-client', handleSetClient);
  }

  function handleSetClient(data) {
    if (data.client) setClient(data);
    else {
      toast.error('You are not logged in');
      router.visit('/client/signup');
    }
  }
  return (
    <div className="overflow-x-hidden">
      <Header client={client}/>
      <div className="pt-[63px]">
        { children }
      </div>
      <Footer/>
    </div>
  )
}

export default ClientLayout;
