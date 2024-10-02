import React, { useEffect, useState, useContext } from 'react'
import Service from '../../Components/Products/Service'
import requestHandler from '../../services/requestHandler';
import ClientLayout from '../../Layouts/ClientLayout';
import { toast } from 'react-toastify';
import { router, usePage } from '@inertiajs/react';
import { loaderSetter } from '../../Components/Common/Loader';
import { AppContext } from '../../appContext';


const Checkout = () => {
    // const [productId, setProductId] = useState();
    const [product, setProduct] = useState({});
    const [response, setResponse] = useState([]);
    const [client, setClient] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [transaction, setTransaction] = useState([]);
    const [streetPackages, setStreetPackages] = useState([]);
    const { clientData,updateClient } = useContext(AppContext);
    const [polling, setPolling] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);


    useEffect(() => {
      getStreetPackages();
      console.log(clientData);
    },[]);

    useEffect(() => {
        !isSubscribed && window.location.reload()
    },[isSubscribed])

    useEffect(() => {
      const channel = window.Echo.channel('private.transaction');
      channel.subscribed(() => {
        setIsSubscribed(true)
        console.log('Successfully subscribed to private.transaction');
      }).listen('.transaction', (e) => {
          if(e.confirmation){
            if(e.confirmation == transaction){
              return;
            }
            toast.success('Payment successful',{
                position: "top-center"
            });
           
            setTransaction(e.confirmation);
            requestHandler.post('/api/subscribe',{transaction_id: e.transactionId, ip: clientData?.ip, mac: clientData?.mac},setResponse, null, loaderSetter);

            // router.visit('/client/connected');
          }
          
      });

      return () => {
      channel.unsubscribe('.transaction');
      };
  }, []);

  useEffect(() => {
    let intervalId;
    let timeoutId;

    if (polling) {
        // Set up polling every 4 seconds
        intervalId = setInterval(() => getTransaction(transaction?.id), 4000);

        // Set up timeout to stop polling after 2 minutes
        timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            setPolling(false);
        }, 2 * 60 * 1000);
    }

    // Cleanup function to clear intervals and timeouts when the component is unmounted
    return () => {
        if (intervalId) clearInterval(intervalId);
        if (timeoutId) clearTimeout(timeoutId);
    };
}, [polling]);

  useEffect(() => {
    if(response && response.message){
      // window.location.href = 'http://hotspot.etnet/login?dst=http%3A%2F%2Fwww.msftconnecttest.com%2Fredirect';
      window.location.href = 'https://task.etnet.co.ke/client/connected'
    }
  }, [response]);

    function getStreetPackages() {
      requestHandler.get('/api/street_packages', handleStreetPackages);
    }

    function handleStreetPackages(data) {
      setStreetPackages(data);
      const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get('productId');

        if(param){
            const foundProduct = data.find(p => p.id == param);
            setProduct(foundProduct);
        }

    }

    useEffect(() => {
      getClient()
    },[])

    useEffect(() => {
        if(client?.client && !client?.client.is_registered_hotspot){
          requestHandler.post('/api/register/client', { client_id: client.client.id, devices: product.devices }, setResponse);
        }
    },[client])

    useEffect(() => {
    
      if(transaction.payment_confirmation){
        toast.success('Payment successful',{
          position: "top-center"
        });
      
        setPolling(false);
        requestHandler.post('/api/subscribe',{transaction_id: transaction?.id, ip: clientData?.ip, mac: clientData?.mac},setResponse,null,loaderSetter);
      }
    },[transaction])

    function getClient() {
      requestHandler.get('/api/get-client',setClient);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            amount: product.cost,
            client_id: client?.client?.id,
            street_package_id: product.id,
            country_code: 254,
            phone_number: phoneNumber,
        }
        // send payment request to server
        requestHandler.post('/api/mpesa/payment', data, handleResponse)
        // const data = {"Body":{"stkCallback":{"MerchantRequestID":"f1e2-4b95-a71d-b30d3cdbb7a71224224","CheckoutRequestID":"ws_CO_12082024103757041726945514","ResultCode":0,"ResultDesc":"The service request is processed successfully.","CallbackMetadata":{"Item":[{"Name":"Amount","Value":1.0},{"Name":"MpesaReceiptNumber","Value":"SHC7S6SHXP"},{"Name":"Balance"},{"Name":"TransactionDate","Value":20240812103801},{"Name":"PhoneNumber","Value":254726945514}]}}}}
        // requestHandler.post('/api/payment-callback',data);
    }

  function handleResponse(resp) {
    if (resp) {
      toast.success('We have sent a prompt to your phone\nPlease enter your MPESA pin when you get the prompt');
      setTransaction({...transaction,['id']: resp.transaction_id})
     
      if(resp.isiOS){
        setPolling(true)
      }

      
     
    }  
  }

  function getTransaction(transactionId){
    requestHandler.get(`/api/transaction?id=${transactionId}`,setTransaction)
    return transaction;
  }

  return (
    <ClientLayout>
        <div className='w-full flex flex-col justify-center min-h-full'>
          <h1 className='my-4 text-3xl text-center font-bold'>Checkout</h1>
        <div className='md:flex mx-auto lg:w-4/5 md:justify-around my-auto'>
          <div className='flex flex-col flex-wrap justify-center items-center shadow w-full md:w-2/5 p-8 rounded-2xl border border-green-100 mb-5'>
            <div className='rounded-xl w-3/4 h-24 shadow-sm border-2 border-green-100 bg-slate-100 flex justify-center items-center p-2 mb-12'>
              <img src="/assets/image/lipa_na_mpesa.png" alt="Logo" width={300} />
            </div>
            <div className="w-full flex items-center border-2 mb-3 py-2 px-2 rounded-2xl">
              <p className=" text-gray-400">+254</p>
              <input
                id="phonenumber"
                className=" pl-2 w-full outline-none border-none bg-blue-200/0"
                type="text"
                name="phonenumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button type="submit" onClick={handleSubmit} className="block w-full bg-green-500 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Pay Now</button>
          </div>
          <div className='hidden md:block'>
            <Service streetPackage={product} showAccessLink={false} />
          </div>
        </div>
    </div>
    </ClientLayout>
  )
}

export default Checkout
