import {PlusCircleIcon, MinusCircleIcon, TrashIcon} from "@heroicons/react/24/outline"
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import {SubmitHandler, useForm} from "react-hook-form";

import { useSession } from 'next-auth/react';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import useCloudinary from "@/components/hooks/useCloudinary";
import { Session } from "inspector";

export interface ReadFormProps {
  onSubmit: SubmitHandler<ReadValues>;
  isLoading?: boolean;
  triggerReset?: boolean;
  values?: DatabaseReadValues;
  label?: string;
  currentBooking?: object; 
}

export interface ReadValues {
  booking_id: number;
  posted_by: string;
  value: number;
  kw_h_cost_when_created: number;
  img_url: string;
}

export interface DatabaseReadValues extends ReadValues {
  _id?: string;
}

export default function ReadsForms(props: ReadFormProps) {
  const {onSubmit, isLoading, triggerReset, values, currentBooking} = props;
  const {
      register,
      unregister,
      handleSubmit,
      formState: {errors},
      reset,
    } = useForm<ReadValues>({
      defaultValues: {...values},
    });
  
    useEffect(() => {
      triggerReset && reset();
    }, [triggerReset, reset]);


  const [thumb, setThumb] = useState(values?.step_images[0] ? values?.step_images[0] : "")
  const {data: {user}} = useSession();
  const {Cloudinary} = useCloudinary();

  const handleUpload = (event) => {
    event.preventDefault()
    if(!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_PRESET){
        console.log("Enviroment variables are missing")
    }else{
        // @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const myWidget = cloudinary.createUploadWidget({
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
            uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
            sources: ['local', 'camera'],
            folder: "IC"+ "/" + user.email + "/"
        }, 
            (error, result) => { 
                if (!error && result && result.event === "success") { 
                    console.log('Done! Here is the image info: ', result.info);
                    setThumb(result.info.public_id) 
                }
            }
        )
        myWidget.open()
    }
  };


  return (

    <form
      onSubmit={handleSubmit((data) => 
        onSubmit({
          ...data,
          ...{
              ...{img_url: thumb}
          }
      })
    )}>

      <div className="space-y-12 sm:space-y-16">
        <div>
          <div className="space-y-8 border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10">
            { thumb && (<>
                <div className="flex border-2 border-black rounded-2xl p-2 w-2/3 m-auto mb-6 mt-6">
                    <AdvancedImage className="rounded-2xl" cldImg={Cloudinary.image(thumb).resize(thumbnail().width(150).height(150))} />
                    <TrashIcon className="w-8 h-8 cursor-pointer m-16" onClick={() => setThumb("")}/>
                </div>
                <hr/>
                {JSON.stringify(thumb)}
            </>)}
            { !thumb && (<>
                <div className='m-2 flex'>
                    <div className="flex justify-center items-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-rose-100 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-rose-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mt-5">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onClick={handleUpload} />
                        </label>
                    </div>
                </div>
            </>)}

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Value
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  {...register("value", {required: true})}
                  id="value"
                  autoComplete="value"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
              <h3 className="font-bold text-red-600">
                {errors.value && (
                    <span data-test="name-error"> Value is required</span>
                )}
              </h3>
            </div>
            <input
              type="hidden"
              {...register("booking_id", {required: true})}
              id="booking_id"
              value={currentBooking.id}
            />

            <input
              type="hidden"
              {...register("posted_by", {required: true})}
              id="posted_by"
              value={currentBooking.visitor_id}
            />

            <input
              type="hidden"
              {...register("kw_h_cost_when_created", {required: true})}
              id="kw_h_cost_when_created"
              value={currentBooking.Houses.kw_h_cost}
            />
            
            
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
