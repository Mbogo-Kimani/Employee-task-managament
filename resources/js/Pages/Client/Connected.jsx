import React, { useContext, useEffect, useState } from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import Icon from '../../Components/Common/Icon'
import { Link } from '@inertiajs/react'
import requestHandler from '../../services/requestHandler'
import { AppContext } from '../../appContext'
import { loaderSetter } from '../../Components/Common/Loader'

function Connected() {
  const { client } = useContext(AppContext);
  const [packages, setPackages] = useState([]);
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
    checkActivePackages();
  }, []);

  function checkActivePackages() {
    requestHandler.post('/api/get_active_packages', { clientId: client.id }, handlePackages, null, loaderSetter);
  }

  function handlePackages(data) {
    setActivePlans(data);
  }
  return (
    <ClientLayout>
      <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden" style={{fontFamily: "'Work Sans', 'Noto Sans', sans-serif"}}>
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
              <h2 className="text-[#0e141b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">You're online!</h2>
              <p className="text-[#0e141b] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">You're connected to the internet and your current plan is</p>
              
              {
                (Array.isArray(activePlans.data) ? activePlans.data : []).map((plan, idx) => {
                  return (
                    <div key={plan.id || idx} className="flex items-center gap-4 bg-slate-50 hover:bg-slate-200 rounded-lg px-4 min-h-[72px] py-2">
                      <div className="text-[#0e141b] flex items-center justify-center rounded-lg bg-[#e7edf3] shrink-0 size-12" data-icon="WifiHigh" data-size="24px" data-weight="regular">
                        <Icon src='wifi' className='w-10 h-10'/>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-[#0e141b] text-base font-medium leading-normal line-clamp-1">{ plan?.street_package?.name }</p>
                        <p className="text-[#4e7097] text-sm font-normal leading-normal line-clamp-2">{ plan?.street_package?.description }</p>
                      </div>
                    </div>
                  )
                })
              }
              
              <div className="flex justify-stretch">
                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
                  {/* <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 hover:bg-slate-300 text-[#0e141b] text-sm font-bold leading-normal tracking-[0.015em]"
                  >
                    <span className="truncate">View details</span>
                  </button> */}
                  <Link href='/products'>
                    <button
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1979e6] hover:bg-blue-600 text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
                    >
                      <span className="truncate">Buy Another</span>
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