import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import {SubmitHandler, useForm} from "react-hook-form";

export interface BookingFormProps {
  onSubmit: SubmitHandler<BookingValues>;
  isLoading?: boolean;
  triggerReset?: boolean;
  values?: DatabaseBookingValues;
  label?: string;
}

export interface BookingValues {
  visitor_id: bigint;
  house_id: bigint;
  start_date: Date;
  end_date: Date;
  status: boolean;
}

export interface DatabaseBookingValues extends BookingValues {
  _id?: string;
}

export default function ReadsForms(props: BookingFormProps) {
  const {onSubmit, isLoading, triggerReset, values} = props;
  const {
      register,
      unregister,
      handleSubmit,
      formState: {errors},
      reset,
    } = useForm<BookingValues>({
      defaultValues: {...values},
    });
  
    useEffect(() => {
      triggerReset && reset();
    }, [triggerReset, reset]);

  const [users, setUsers] = useState([])
  const [houses, setHouses] = useState([])
  
  const [notReady, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/api/users/getAll')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })

    fetch('http://localhost:3000/api/houses/getAll')
    .then((res) => res.json())
    .then((data) => {
      setHouses(data)
      setLoading(false)
    })
  }, [])

  if (notReady) return <p>Loading...</p>

  return (
    <form
      onSubmit={handleSubmit((data) => 
        onSubmit({
            ...data,
        })
    )}>
      <div className="space-y-12 sm:space-y-16">
        <div>
          
          <div className="space-y-8 border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10">

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Customer
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  id="visitor_id"
                  {...register("visitor_id", {required: true})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option disabled> Select a Customer</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}> {user.id} :: {user.name} - {user.email}</option> 
                  ))}
                </select>
              </div>
              <h3 className="font-bold text-red-600">
                {errors.visitor_id && (
                    <span data-test="name-error"> Customer is required</span>
                )}
              </h3>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Stays At: 
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  id="house_id"
                  {...register("house_id", {required: true})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option disabled> Select a House</option>
                  {houses.map((house) => (
                    <option key={house.id} value={house.id}>{house.id} :: {house.house_name} - {house.address_line1} {house.address_line2}. Owner: {house.Users.name}  {house.Users.email}</option> 
                  ))}
                </select>
              </div>
              <h3 className="font-bold text-red-600">
                {errors.house_id && (
                    <span data-test="name-error"> House is required</span>
                )}
              </h3>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="start_date" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Arrival
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="datetime-local"
                  {...register("start_date", {required: true})}
                  id="start_date"
                  autoComplete="start_date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
              <h3 className="font-bold text-red-600">
                {errors.start_date && (
                    <span data-test="name-error"> Start Date is required</span>
                )}
              </h3>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="end_date" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Departure
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="datetime-local"
                  {...register("end_date", {required: true})}
                  id="end_date"
                  autoComplete="end_date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
              <h3 className="font-bold text-red-600">
                {errors.end_date && (
                    <span data-test="name-error"> End Date is required</span>
                )}
              </h3>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Status
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Confirmed</option>
                  <option>Pending</option>
                </select>
              </div>
              <h3 className="font-bold text-red-600">
                {errors.status && (
                    <span data-test="name-error"> Status is required</span>
                )}
              </h3>
            </div>
            <div className="flex items-center justify-end pt-6 border-solid border-slate-200 rounded-b">
              <input
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit" value={'Save Changes'}
              />
                  
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
