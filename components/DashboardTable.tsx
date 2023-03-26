
  
export default function DashboardTable() {

    const people = [
        { customer: 'Customer 1', house: 'House 3', arrival: '28/2/2023', departure: '7/3/2023', status: 'Confimed' },
        { customer: 'Customer 1', house: 'House 3', arrival: '28/2/2023', departure: '7/3/2023', status: 'Confimed' },
        { customer: 'Customer 1', house: 'House 3', arrival: '28/2/2023', departure: '7/3/2023', status: 'Confimed' },
        { customer: 'Customer 1', house: 'House 3', arrival: '28/2/2023', departure: '7/3/2023', status: 'Pending' },
    ]
        
    return (
        <div className="-ml-16">
            <div className="mt-8 pt-8 pb-8 font-bold text-2xl">Bookings</div>
            <div  className="bg-white rounded-lg -ml-3">  
                <div className="p-6 font-semibold text-md flex  space-x-8 m-w-full">
                    <div className="bg-blue-300 font-bold rounded-xl p-2 px-8">Upcoming</div>
                    <div className="bg-blue-100 rounded-xl p-2 px-8">Passed</div>
                    <div className="bg-blue-100 rounded-xl p-2 px-8">All Bookings</div>  
                </div>
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr className="font-bold text-left">
                            <th scope="col" className="px-10 py-6">
                                Customer
                            </th>
                            <th scope="col" className="px-10 py-6">
                                Staying at
                            </th>
                            <th scope="col" className="px-10 py-6">
                                Arrival
                            </th>
                            <th scope="col" className="px-10 py-6">
                                Departure
                            </th>
                            <th scope="col" className="px-10 py-6">
                                Status
                            </th>
                            <th scope="col" className="px-10 py-6">
                                Details
                            </th>
                            <th scope="col" className="px-10 py-6"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white max-w-min">
                        {people.map((person) => (
                        <tr key={person.customer}>
                            <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900"> 
                                <div className="flex flex-shrink-0 bg-blue-50 rounded-xl">
                                    <a href="#" className="group block w-full flex-shrink-0 p-2">
                                        <div className="items-center">
                                        <div>
                                            <img
                                            className="inline-block h-12 w-12 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-lg font-bold text-black">{person.customer}</p>
                                        </div>
                                        </div>
                                    </a>
                                </div>

                            </td>
                            <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                                {person.house}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.arrival}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium ">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Manage<span className="sr-only">, {person.customer}</span>
                                </a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}