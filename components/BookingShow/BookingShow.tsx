'use client';

import { useState, useEffect, useRef } from "react";
import BookingsForms from "../forms/BookingsForms";
import { useMutation } from "react-query"
import axios from "axios";
import Alert from "../utils/Alert";
import ReadsHistory from "../visitor/ReadsHistory";
import Consumed from "../visitor/Consumed";

import { usePathname } from 'next/navigation';
import General from "./General"



async function getBooking(id){
    const response = await fetch(`http://localhost:3000/api/bookings/${id}`)
    const data = await response.json()
    console.log(JSON.stringify(data))
    return data
}
  
export default function BookingShow({booking_id}) {

    const pathname = usePathname();

    const [booking, setBooking] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [section, setSection] = useState("general");

    async function fetchBooking() {
        const data = await getBooking(Number(booking_id));
        setBooking(data);
        setIsLoading(false)
    }

    useEffect(() => {
        fetchBooking();
    }, []);
        
    return (
        <div className="">
            {isLoading ? (
                    <div>Loading...</div>
                ) : (
            <>
            <div className="mt-8 pt-8 pb-8 font-bold text-2xl">{booking.User.name}´s Booking for {new Date(booking.start_date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</div>
            <div  className="bg-white rounded-lg">  
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-4 text-center">
                    <button className={`rounded-xl p-2 ${section=="general" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('general')}>General</button>
                    <button className={`rounded-xl p-2 ${section=="consumption" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('consumption')}>Consumption</button>
                    <button className={`rounded-xl p-2 ${section=="history" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('history')}>Meter Reads</button>
                </div>
                <hr/>
               
                <div className="w-full bg-white rounded-2xl">
                    {section=="general" && (
                        <General booking={booking}/>
                    )}
                    {section=="consumption" && (
                        <Consumed booking_id={booking.id}/>
                    )} 
                    {section=="history" && (
                        <ReadsHistory booking_id={booking.id}/>
                    )} 
                </div>
                
            </div>
            </>)}
        </div>
    )
}