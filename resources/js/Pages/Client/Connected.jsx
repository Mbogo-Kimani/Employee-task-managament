import React, { useContext, useEffect, useState } from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import Icon from '../../Components/Common/Icon'
import { Link } from '@inertiajs/react'
import requestHandler from '../../services/requestHandler'
import { AppContext } from '../../appContext'
import { loaderSetter } from '../../Components/Common/Loader'

function Connected() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [client, setClient] = useState({});
  const [response, setResponse] = useState([]);
  const [activePlans, setActivePlans] = useState({
    data: [],
    from: 1,
    last_page: 0,
    per_page: 20,
    prev_page_url: null,
    next_page_url: null,
    to: 0,
    total: 0,
});

  useEffect(() => {
    getClient()
  }, []);
  useEffect(() => {
    getSubscriptions();
  }, [client]);
  useEffect(() => {
    if(response && response.message){
      window.location.href = 'http://hotspot.etnet/logindst=http%3A%2F%2Fwww.msftconnecttest.com%2Fredirect';
    }
  }, [response]);



  function getClient() {
    requestHandler.get('/api/get-client',setClient);
  }

  function getSubscriptions() {
   
    requestHandler.get(`/api/client/subscriptions?clientId=${client?.client?.id}`, setSubscriptions, null, loaderSetter);
    // const data = {"Body":{"stkCallback":{"MerchantRequestID":"f1e2-4b95-a71d-b30d3cdbb7a71224224","CheckoutRequestID":"ws_CO_12082024103757041726945514","ResultCode":0,"ResultDesc":"The service request is processed successfully.","CallbackMetadata":{"Item":[{"Name":"Amount","Value":1.0},{"Name":"MpesaReceiptNumber","Value":"SHC7S6SHXP"},{"Name":"Balance"},{"Name":"TransactionDate","Value":20240812103801},{"Name":"PhoneNumber","Value":254726945514}]}}}}
    // requestHandler.post('/api/payment-callback',data);
  
  }

  function handleHotspotLogin(){
    const filteredSubscriptions = subscriptions.filter(i=> {
      return i.profile_assigned == false
    })
    if(filteredSubscriptions.length){
      requestHandler.post('/api/subscribe',{subscription_id: filteredSubscriptions[0].id},setResponse);
    }else{
      window.location.href = 'http://hotspot.etnet/logindst=http%3A%2F%2Fwww.msftconnecttest.com%2Fredirect'
    }
  }
  return (
    <ClientLayout>
      <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden" style={{fontFamily: "'Work Sans', 'Noto Sans', sans-serif"}}>
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
              <h2 className="text-[#0e141b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">You're online!</h2>
              <p className="text-[#0e141b] text-base font-bold leading-normal pb-3 pt-1 px-4 text-center">Subscriptions</p>
              <div className=''>
                {
                (Array.isArray(subscriptions) ? subscriptions : []).map((plan, idx) => {
                  return (
                    <div key={plan.id || idx} className="border rounded border-yellow-300 mb-3 flex items-center gap-4 bg-slate-50 hover:bg-slate-200 rounded-lg px-4 min-h-[72px] py-2">
                      <div className="text-[#0e141b] flex items-center justify-center rounded-lg bg-[#e7edf3] shrink-0 size-12" data-icon="WifiHigh" data-size="24px" data-weight="regular">
                        <Icon src='wifi' className='w-10 h-10'/>
                      </div>
                      <div className="flex justify-between w-full">
                        <p className="text-[#0e141b] text-base font-medium leading-normal  items-center">{ plan.street_package.name }</p>
                        
                        <p className="text-[#4e7097] text-sm font-normal leading-normal line-clamp-2 flex items-center"><Icon src='calendar' className='w-10 h-10 mr-3'/><p className='flex flex-col'>Expires At  <span className='text-red-300'>{  plan.expires_at }</span></p></p>
                      </div>
                    </div>
                  )
                })
              }
              </div>
              
              
              <div className="flex justify-stretch">
              <div>
                <h2 className='text-xl'>Hotspot Login</h2>
                <p>Username: <span>{client?.client?.name}</span></p>
                <p>Password:<span>{client?.client?.phone_number.replace("+254","0")}</span></p>
              </div>
                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
                  {/* <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 hover:bg-slate-300 text-[#0e141b] text-sm font-bold leading-normal tracking-[0.015em]"
                  >
                    <span className="truncate">View details</span>
                  </button> */}
                  {/* <Link href='/products'> */}
                    <button
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-green-600 hover:bg-green-700 text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
                      onClick={handleHotspotLogin}
                    >
                      <span className="truncate">Login to the Hotspot</span>
                    </button>
                  {/* </Link> */}
                  <Link href='/products'>
                    <button
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1979e6] hover:bg-blue-600 text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
                    >
                      <span className="truncate">Buy another bundle</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Connected