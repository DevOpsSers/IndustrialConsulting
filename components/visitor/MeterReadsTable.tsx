'use client';

import { useState, useEffect } from "react";
import ReadsForms from "../../components/visitor/forms/ReadsForms"
import { useMutation } from "react-query"
import axios from "axios";
import Alert from "../utils/Alert";
import ReadsHistory from "./ReadsHistory";
import Consumed from "./Consumed"
import {useSession} from "next-auth/react"

async function getCurrentBooking(){
    const response = await fetch(`http://localhost:3000/api/users/getCurrentBooking`)
    const data = await response.json()
    return data
}
  
export default function ReadsTable() {

    const [section, setSection] = useState("consumed");

    const [isLoading, setIsLoading] = useState(true);
    const [currentBooking, setCurrentBooking] = useState();

    const {data: session} = useSession()
    // alert((session?.user.email))

    async function fetchReads(section=null) {
        const data = await getCurrentBooking();
        setCurrentBooking(data);
        setIsLoading(false)
    }


    useEffect(() => {
        
        fetchReads();
    }, []);

    const { isSuccess, isError, mutate } = useMutation(
        (booking: BookingValues) => {
          setShowModal(false)
          
          return axios.post(
            "http://localhost:3000/api/reads/create",
            booking,
            { withCredentials: true }
          );
        },
        {
            onSuccess: () => {
                fetchReads(section);
            },
          }
        );
      
    
    const [showModal, setShowModal] = useState(false);

    if(!currentBooking){
        return(
            <div className="flex justify-center items-center h-[100vh]">
                <h1>It looks like you haven´t got any booking</h1>
            </div>
        )
    }
        
    return (
        <div className="">
            
            <div className="mt-8 pt-8 pb-8 font-bold text-2xl">Consumtion</div>
            {isError && 
                <Alert
                    variant="warning"
                    label="There was an error adding your Meter Read"
                />
            }
            {isSuccess && 
                <Alert
                    variant="success"
                    label="Meter Read was added succesfully!"
                />
            }
            <div  className="bg-white rounded-lg">  
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-4 text-center">
                    <button className={`rounded-xl p-2 ${section=="consumed" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('consumed')}>Consumed Energy</button>
                    <button className={`rounded-xl p-2 ${section=="house" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('house')}>House</button>
                    <button className={`rounded-xl p-2 ${section=="history" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('history')}>History</button>
                    <div></div> 
                    <div className="bg-blue-100 rounded-xl p-2 hover:bg-blue-300 hover:cursor-pointer" onClick={() => setShowModal(true)}>+ Add Read</div> 
                </div>
                <hr/>
                {section=="history" && (
                    <ReadsHistory booking_id={currentBooking.id}/>
                )}
                {section=="consumed" && (
                    <Consumed booking_id={currentBooking.id}/>
                )}
                
            </div>
            
            {showModal ? (
                <>
                <div
                    className="justify-center pt-8 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Add Read
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
                        <ReadsForms onSubmit={(r) => mutate(r)} currentBooking={currentBooking}/>
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