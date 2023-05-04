'use client';

import { useState, useEffect, useRef } from "react";
import BookingsForms from "../forms/BookingsForms";
import { useMutation } from "react-query"
import axios from "axios";
import Alert from "../utils/Alert";

import { usePathname } from 'next/navigation';
import HouseShowGeneral from "./General"
import QR from "./QR"
import Bookings from "./Bookings"


async function getHouse(id){
    const response = await fetch(`http://localhost:3000/api/houses/${id}`)
    const data = await response.json()
    return data
}
  
export default function HouseShow({house_id}) {

    const pathname = usePathname();

    const [house, setHouse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [section, setSection] = useState("general");

    async function fetchHouse() {
        const data = await getHouse(Number(house_id));
        setHouse(data);
        setIsLoading(false)
    }

    useEffect(() => {
        fetchHouse();
    }, []);
        
    return (
        <div className="">
            <div className="mt-8 pt-8 pb-8 font-bold text-2xl">{house.house_name}</div>
            <div  className="bg-white rounded-lg">  
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 text-center">
                    <button className={`rounded-xl p-2 ${section=="general" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('general')}>General</button>
                   
                    <button className={`rounded-xl p-2 ${section=="qr" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('qr')}>See qr</button>
                </div>
                <hr/>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                <div className="w-full bg-white rounded-2xl">
                    {section=="general" && (
                        <HouseShowGeneral house={house}/>
                    )} 
                    {section=="qr" && (
                        <QR url="http://localhost:3000/visitors"/>
                    )}
                    {section=="bookings" && (
                        <Bookings house_id={house.id}/>
                    )}  
                </div>)}
            </div>
            
        </div>
    )
}