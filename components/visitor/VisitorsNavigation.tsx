"use client";
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {useSession, signIn, signOut} from "next-auth/react"
import { redirect } from "next/navigation";

function logout_redirect(){
  signOut()
}

const navigation = [
  // { name: 'Consumtion', icon: HomeIcon, href: '/visitors/meter_reads'},
  // { name: 'Users', icon: UsersIcon, href: '/visitors/people'},
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}



export default function Navigation() {

  const pathname = usePathname();
  const {data: session} = useSession()

  return (
    <div className="flex h-screen flex-1 flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 p-4 bg-green-300 rounded-xl m-6">
          <a href="#" className="group block w-full flex-shrink-0">
          {session?.user  && (
              <div className="flex items-center">
                <div>
                  <Image className="inline-block h-16 w-16 rounded-full" width={16} height={16} src={session.user.image}></Image>

                </div>
                <div className="ml-3">
                  <p className="text-lg font-bold text-black">{session.user.name}</p>
                  <p className="text-sm font-medium text-black group-hover:text-white" onClick={() => logout_redirect()}>Log Out</p>
                </div>
              </div>
            )}
          </a>
        </div>
        <div className="m-4">
          <nav className="mt-5 flex-1 space-y-1 px-2" aria-label="Sidebar">
            {navigation.map((item) => (
              <Link 
                href={item.href}
                key={item.name}
                className={classNames(
                  pathname.includes(item.href)  ? 'bg-white text-black' : 'text-gray-400 hover:bg-white hover:text-black hover:bg-opacity-75',
                  'group flex items-center rounded-md px-2 py-2 text-base font-bold'
                )}
              >
                {/* {url} */}
                <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <span className="flex-1">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
