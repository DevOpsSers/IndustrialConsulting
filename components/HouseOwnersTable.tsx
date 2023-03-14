import { EnvelopeIcon, PhoneIcon, HomeIcon } from '@heroicons/react/20/solid'

const people = [
  {
    name: 'Owner 1',
    rate: '4.5',
    role: 'Owner of 3 house(s)',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Owner 2',
    rate: '4.5',
    role: 'Owner of 1 house(s)',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29uYXxlbnwwfHwwfHw%3D&w=1000&q=80',
  },
  {
    name: 'Owner 3',
    rate: '4.5',
    role: 'Owner of 2 house(s)',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Owner 4',
    rate: '4.5',
    role: 'Owner of 5 house(s)',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'data:image/jpeg;base64,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',
  },
  {
    name: 'Owner 5',
    rate: '4.5',
    role: 'Owner of 3 house(s)',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

export default function Example() {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {people.map((person) => (
        <li
          key={person.email}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={person.imageUrl} alt="" />
            <h3 className="mt-6 text-sm font-medium text-gray-900">{person.name}</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Rating</dt>
              <dd className="text-sm text-gray-500">Rating: {person.rate}/5</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  {person.role}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Email</span>
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${person.telephone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Call</span>
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${person.telephone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <HomeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Manage</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
