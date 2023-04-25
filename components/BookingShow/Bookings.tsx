'use client';

import { useState, useEffect } from "react";
import BookingsForms from "../forms/BookingsForms";
import { useMutation } from "react-query"
import axios from "axios";
import Alert from "../utils/Alert";
import Link from 'next/link'


async function getBookings(house_id){
    const response = await fetch(`http://localhost:3000/api/bookings/house/${house_id}`)
    const data = await response.json()
    return data
}
  
export default function BookingsTable({house_id}) {

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchBookings() {
        const data = await getBookings(house_id);
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
        
    return (
        <div className="">
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
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 text-center">
                    <div className="bg-blue-300 font-bold rounded-xl p-2">Upcoming</div>
                    <div className="bg-blue-100 rounded-xl p-2">Passed</div>
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
                            <th>Arrival</th>
                            <th> Departure</th>
                            <th>Details</th>
                        </tr>
                            
                        {bookings.map((booking) => (
                        <tr key={booking.id}>
                            
                            <td>
                                <div className="flex m-2 bg-green-100 rounded-md">
                                    <div className="m-2">
                                        <img
                                        className="inline-block h-16 w-16 rounded-md"
                                        src={booking.Users.profile_picture_url}
                                        alt=""
                                        />
                                    </div>
                                    <div className="m-2">    
                                        <div className="font-bold">{booking.Users.name} {booking.Users.surname}</div>
                                        <div>{booking.Users.email}</div>
                                        <div>{booking.Users.phone_number}</div>
                                    </div>   
                                </div> 
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
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Manage
                                </a>
                            </td>
                        </tr>
                        ))}
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
                                <span className="text-white p-2 pb-4 text-3xl">
                                ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative pt-6 px-6 flex-auto">
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