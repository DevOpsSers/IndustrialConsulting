
  
export default function DashboardTable() {

    const people = [
        { customer: 'Customer 1', house: 'House 3', arrival: '28/2/2023', departure: '7/3/2023', status: 'Confimed' },
        { customer: 'Customer 1', house: 'House 3', arrival: '28/2/2023', departure: '7/3/2023', status: 'Confimed' },
        { customer: 'Customer 1', house: 'House 3', arrival: '28/2/2023', departure: '7/3/2023', status: 'Confimed' },
        { customer: 'Customer 1', house: 'House 3', arrival: '28/2/2023', departure: '7/3/2023', status: 'Pending' },
    ]
        
    return (
        <div className="px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
                type="button"
                className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Add user
            </button>
            </div>
        </div>
        <div className="mt-8 flow-root">
            <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                    <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 lg:pl-8">
                        Customer
                    </th>
                    <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 lg:pl-8">
                        Staying at
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Arrival
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Departure
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-6 lg:pr-8">
                        <span className="sr-only">Edit</span>
                    </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                    <tr key={person.customer}>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 lg:pl-8">
                        {person.customer}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 lg:pl-8">
                        {person.house}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.arrival}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium lg:pr-8">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Manage<span className="sr-only">, {person.customer}</span>
                        </a>
                        </td>
                        <td>
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Details<span className="sr-only">, {person.customer}</span>
                        </a>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    )
}