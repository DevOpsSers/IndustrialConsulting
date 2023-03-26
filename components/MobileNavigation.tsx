'use client';
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon, EyeDropperIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';

const navigation = [
  { name: 'Bookings', icon: FolderIcon, href: '/dashboard', current: true },
  { name: 'Houses', icon: HomeIcon, href: '/dashboard/houses', count: 4, current: false },
  { name: 'House Owners', icon: UsersIcon, href: '/dashboard/houseowners', count: 12, current: false },
  { name: 'Staff', icon: UsersIcon, href: '/dashboard/staff', count: 3, current: false },
  { name: 'Clients', icon: UsersIcon, href: '/dashboard/clients', current: false },
  { name: 'Reports', icon: ChartBarIcon, href: '#', current: false },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  
  const [navbar, setNavbar] = useState(false)

  function Dropdown(){
    if(navbar==false){
      setNavbar(true)
    }else{
      setNavbar(false)
    }
  }

  
  
  return (
    <div className="flex flex-1 flex-col max-w-screen-lg w-full ">
      <div className="flex flex-shrink-0 p-4 bg-green-300">
        <a href="#" className="group block flex-shrink-0">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-12 w-12 md:h-20 md:w-20 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-lg font-bold text-black">Timon Cook</p>
              <p className="text-sm font-medium text-black group-hover:text-white">View profile</p>
            </div>
          </div>
        </a>
        <button className='m-6 absolute right-0' onClick={Dropdown}>Dropdown</button>
      </div>
      {navbar && 
        <div className="max-w-md">
          <nav className="flex-1 space-y-4 px-8 pt-4 h-full absolute bg-green-100 border-r-[1px] border-black" aria-label="Sidebar">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'bg-white text-black' : 'text-gray-400 hover:bg-white hover:text-black hover:bg-opacity-75',
                  'group flex items-center rounded-md px-2 py-2 text-base font-bold'
                )}
              >
                <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <span className="flex-1">{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      }
    </div>
  )
}
