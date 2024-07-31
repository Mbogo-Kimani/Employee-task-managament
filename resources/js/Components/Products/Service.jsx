import { Link, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'


function Service({ streetPackage,client }) {
    return (
      // <div class="bg-white p-1 rounded-3xl ring-1 ring-gray-200 w-fit m-4 ">
        <div class="m-4 p-2 lg:mt-0 lg:flex-shrink-0 min-w-fit">
          <div class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div class="mx-auto max-w-xs px-8">
              <p class="text-base font-semibold text-gray-600">{streetPackage.name}</p>
              <p class="mt-6 flex items-baseline justify-center gap-x-2">
                <span class="text-5xl font-bold tracking-tight text-gray-900">@{streetPackage.cost}</span>
                <span class="text-sm font-semibold leading-6 tracking-wide text-gray-600">Ksh</span>
              </p>
              {
                <Link
                className='mt-10 block w-full rounded-md bg-[var(--orange)] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
                href={`/client/${client?.client ? 'checkout' : 'signup'}?productId=${streetPackage.id}`}
                >
                  Get Access
                </Link>
              }
              {/* <a href="#" class="mt-10 block w-full rounded-md bg-[var(--orange)] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Get access</a> */}
              {/* <p class="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p> */}
              <ul className='mx-auto'>
  
                <li class="flex gap-x-3 mt-4">
                  <svg class="h-6 w-5 flex-none text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                  </svg>
                 {streetPackage.duration}
                </li>
                <li class="flex gap-x-3 mt-4">
                  <svg class="h-6 w-5 flex-none text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                  </svg>
                  {streetPackage.access} access
                </li>
                <li class="flex gap-x-3 mt-4">
                  <svg class="h-6 w-5 flex-none text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                  </svg>
                  {streetPackage.devices} {streetPackage.devices==1?"device":"devices"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      // </div>
  
    )
  }

export default Service