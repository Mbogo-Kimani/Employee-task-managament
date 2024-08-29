import { Link, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'


function Service({ streetPackage, client = null, showAccessLink = true }) {

  
    return (
      <div className="m-4 p-2 lg:mt-0 lg:flex-shrink-0 min-w-fit">
        <div className="rounded-2xl bg-gray-50 py-8 px-14 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-gray-600">{streetPackage.name}</p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">@{streetPackage.cost}</span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">Ksh</span>
            </p>
            {
              showAccessLink &&
              <Link
                className='mt-10 block w-full rounded-md bg-[var(--orange)] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
                href={`/client/${client ? 'checkout' : 'signup'}?productId=${streetPackage.id}`}
              >
                Get Access
              </Link>
            }
            <ul className='mx-auto'>
              <li className="flex gap-x-3 mt-4">
                <svg className="h-6 w-5 flex-none text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
               {streetPackage.duration/60 < 60 ? streetPackage.duration/60 + " minutes" : streetPackage.duration/60 < 1440 ? streetPackage.duration/3600 + " hours" : streetPackage.duration/86400 + `${streetPackage.duration == 86400 ? ' day' : ' days'}`} 
              </li>
              <li className="flex gap-x-3 mt-4">
                <svg className="h-6 w-5 flex-none text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                {streetPackage.access || 'unlimited'} access
              </li>
              <li className="flex gap-x-3 mt-4">
                <svg className="h-6 w-5 flex-none text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                {streetPackage.devices} {streetPackage.devices==1?"device":"devices"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

export default Service