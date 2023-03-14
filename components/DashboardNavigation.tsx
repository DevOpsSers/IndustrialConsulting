import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Bookings', icon: FolderIcon, href: '/dashboard', current: true },
  { name: 'Houses', icon: HomeIcon, href: '/dashboard/houses', count: 4, current: false },
  { name: 'House Owners', icon: UsersIcon, href: '/dashboard/houseowners', count: 12, current: false },
  { name: 'Staff', icon: UsersIcon, href: '/dashboard/staff', count: 3, current: false },
  { name: 'Clients', icon: UsersIcon, href: '/dashboard/clients', current: false },
  { name: 'Calendar', icon: CalendarIcon, href: '/dashboard/calendar', current: false },
  { name: 'Reports', icon: ChartBarIcon, href: '#', current: false },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  return (
    <div className="flex h-screen flex-1 flex-col bg-indigo-700">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
            alt="Your Company"
          />
        </div>
        <nav className="mt-5 flex-1 space-y-1 px-2" aria-label="Sidebar">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
              )}
            >
              <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
              <span className="flex-1">{item.name}</span>
              {item.count ? (
                <span
                  className={classNames(
                    item.current ? 'bg-indigo-600' : 'bg-indigo-800',
                    'ml-3 inline-block rounded-full py-0.5 px-3 text-xs font-medium'
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
        <a href="#" className="group block w-full flex-shrink-0">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Tom Cook</p>
              <p className="text-xs font-medium text-indigo-200 group-hover:text-white">View profile</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}
