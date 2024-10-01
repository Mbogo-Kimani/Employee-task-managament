import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Icon from '../Common/Icon';
import "./dropdown.css"

export default function DropDown({children, src}) {
  return (
    <div className="w-16 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center align-center px-6 text-sm focus:outline-none">
            <Icon data-modal-target="default-modal" data-modal-toggle="default-modal" src={`${src ? src : "menu"}`} className='w-5 h-5 cursor-pointer hover:scale-0' fill='var(--gray)'/>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
            <div className="px-1 py-1 ">
              {children}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
