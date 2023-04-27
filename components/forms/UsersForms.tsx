import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import {SubmitHandler, useForm} from "react-hook-form";

export interface UserFormProps {
  onSubmit: SubmitHandler<UserValues>;
  isLoading?: boolean;
  triggerReset?: boolean;
  values?: DatabaseUserValues;
  label?: string;
}

export interface UserValues {
  name: string,
  email: string,
  phone_number: string | null,
  role: string,
}

export interface DatabaseUserValues extends UserValues {
  _id?: string;
}

export default function BookingsForms(props: UserFormProps) {
  const {onSubmit, isLoading, triggerReset, values} = props;
  const {
      register,
      unregister,
      handleSubmit,
      formState: {errors},
      reset,
    } = useForm<UserValues>({
      defaultValues: {...values},
    });
  
    useEffect(() => {
      triggerReset && reset();
    }, [triggerReset, reset]);

  
  const [notReady, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])


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
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Email
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="email"
                  {...register("email", {required: true})}
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
              <h3 className="font-bold text-red-600">
                {errors.email && (
                    <span data-test="name-error"> Email is required</span>
                )}
              </h3>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  {...register("name", {required: true})}
                  id="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
              <h3 className="font-bold text-red-600">
                {errors.name && (
                    <span data-test="name-error"> Name is required</span>
                )}
              </h3>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Phone Number
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="phone"
                  {...register("phone_number")}
                  id="phone_number"
                  autoComplete="phone_number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
              <h3 className="font-bold text-red-600">
                {errors.phone_number && (
                    <span data-test="name-error"> Phone Number is required</span>
                )}
              </h3>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Role
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  id="role"
                  {...register("role", {required: true})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={"visitor"}>Visitor</option>
                  <option value={"admin"}>Admin</option>
                  <option value={"owner"}>House Owner</option>
                </select>
              </div>
              <h3 className="font-bold text-red-600">
                {errors.role && (
                    <span data-test="name-error"> Role is required</span>
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
