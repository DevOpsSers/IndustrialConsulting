'use client';

import { useState, useEffect } from "react";
import BookingsForms from "./forms/BookingsForms";
import { useMutation } from "react-query"
import axios from "axios";
import Alert from "./utils/Alert";
import Link from 'next/link'
import Image from 'next/image';

import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import useCloudinary from "./hooks/useCloudinary";


async function getBookings(section){

    const response = await fetch(`http://localhost:3000/api/bookings/getAll?section=${section}`)
    const data = await response.json()
    return data
}
  
export default function BookingsTable() {

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [section, setSection] = useState("all");
    
    function changeSection(section){
        setSection(section)
        fetchBookings(section)
    }


    async function fetchBookings(section=null) {
        const data = await getBookings(section);
        setBookings(data);
        setIsLoading(false)
    }

    useEffect(() => {
        
        fetchBookings();
    }, []);


    const { isSuccess, isError, mutate } = useMutation(
        (booking: BookingValues) => {
          setShowModal(false)
          
          return axios.post(
            "http://localhost:3000/api/bookings/create",
            booking,
            { withCredentials: true }
          );
        },
        {
          onSuccess: () => {
            fetchBookings();
          },
        }
      );
    
    const [showModal, setShowModal] = useState(false);

    const {Cloudinary} = useCloudinary();
        
    return (
        <div className="">
            <div className="mt-8 pt-8 pb-8 font-bold text-2xl">Bookings</div>
            {isError && 
                <Alert
                    variant="warning"
                    label="There was an error adding your booking"
                />
            }
            {isSuccess && 
                <Alert
                    variant="success"
                    label="Booking was added succesfully!"
                />
            }
            <div  className="bg-white rounded-lg">  
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 p-4 text-center">
                    <button className={`rounded-xl p-2 ${section=="all" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => changeSection('all')}>All Bookings</button>
                    <button className={`rounded-xl p-2 ${section=="current" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => changeSection('current')}>Current</button>
                    <button className={`rounded-xl p-2 ${section=="upcoming" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => changeSection('upcoming')}>Upcoming</button>
                    <button className={`rounded-xl p-2 ${section=="passed" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => changeSection('passed')}>Passed</button>
                    <div></div> 
                    <div className="bg-blue-100 rounded-xl p-2 hover:bg-blue-300 hover:cursor-pointer" onClick={() => setShowModal(true)}>+ Add Booking</div> 
                </div>
                <hr/>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                <table className="table-auto w-full bg-white rounded-2xl">
                    <tbody>    
                        <tr>
                            <th>Customer</th>
                            <th>Staying at</th>
                            <th>Arrival</th>
                            <th> Departure</th>
                            <th>Details</th>
                        </tr>

                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                  <tr key={booking.id}>   
                                      <td>
                                          <div className="flex m-2 bg-green-100 rounded-md">
                                              <div className="m-2">
                                                  <Image className="inline-block h-16 w-16 rounded-full" width={16} height={16} src={booking.User.image} alt={booking.User}></Image>
                                              </div>
                                              <div className="m-2">    
                                                  <div className="font-bold">{booking.User.name} {booking.User.surname}</div>
                                                  <div>{booking.User.email}</div>
                                                  <div>{booking.User.phone_number}</div>
                                              </div>   
                                          </div> 
                                      </td>
                                      <td>
                                          <Link 
                                              href={`/dashboard/houses/${booking.Houses.id}`}
                                          >
                                              <div className="flex m-2 bg-green-100 rounded-md hover:cursor-pointer hover:bg-green-200">
                                                  <div className="m-2">
                                                      <AdvancedImage className="rounded-2xl" cldImg={Cloudinary.image(booking.Houses.image_url).resize(thumbnail().width(150).height(100))} />
                                                  </div>
                                                  <div className="m-2">    
                                                      <div className="font-bold">{booking.Houses.house_name}</div>
                                                      <div>{booking.Houses.address_line_1}</div>
                                                      <div>{booking.Houses.address_line_2}</div>
                                                  </div>   
                                              </div> 
                                          </Link>
                                      </td>
                                      <td>
                                          <div className="m-2 bg-green-100 rounded-md font-semibold p-2">
                                             <div>{new Date(booking.start_date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</div> 
                                             <div>{new Date(booking.start_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'UTC' })}</div> 
                                          </div> 
                                      </td>
                                      <td>
                                          <div className="m-2 bg-green-100 rounded-md font-semibold p-2">
                                             <div>{new Date(booking.end_date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</div> 
                                             <div>{new Date(booking.end_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'UTC' })}</div> 
                                          </div> 
                                      </td>
                                      <td>
                                        
                                          <Link 
                                              href={`/dashboard/bookings/${booking.id}`}
                                          >
                                              <div className="m-2 bg-green-100 rounded-md p-2 text-indigo-600 hover:text-indigo-900 font-bold">
                                                  Manage
                                              </div>
                                          </Link>
                                      </td>
                                  </tr>
                                ))
                        ) : (
                            <tr>
                                <td>No bookings available</td>
                            </tr>
                        )}


                        
                    </tbody>
                </table>)}
            </div>
            
            {showModal ? (
                <>
                <div
                    className="justify-center pt-24 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Add Booking
                            </h3>
                            <button
                                className=" bg-red-400 float-right rounded-xl"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="text-white p-2 mb-4 text-3xl">
                                ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative px-6 flex-auto">
                        <BookingsForms onSubmit={(r) => mutate(r)}/>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}