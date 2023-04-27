import { useState, useEffect } from "react";


async function getReads(booking_id){
    const response = await fetch(`http://localhost:3000/api/reads/costOfBooking/${booking_id}`)
    const data = await response.json()
    return data
}

export default function Consumed({booking_id}) {

    const [reads, setReads] = useState([]);
    const [firstRead, setFirstRead] = useState([]);
    const [lastRead, setLastRead] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    async function fetchReads(section=null) {
        const data = await getReads(booking_id);
        setReads(data.reads);
        setFirstRead(data.firstRead)
        setLastRead(data.lastRead)
        setIsLoading(false)
    }

    useEffect(() => {
        
        fetchReads();
    }, []);
    
    return (
        <div className="">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="m-8 p-4 grid place-items-center	">
                    <p className="mb-8" >The counter will upload every time you upload a new Meter Read!</p>
                    <div className="flex">
                        <div className=" font-mono">
                            {(!lastRead?.value && !firstRead?.value) && (
                                <div className=" ">
                                    <p>Welcome to your accomodation!</p>
                                    <p>Please upload a first day meter read to measure the energy consume in the facility!</p>
                                </div>
                            )}
                            {((lastRead != null) && (firstRead != null)) && (
                                <div className=" ">
                                    <p>{lastRead.value - firstRead.value} KW/h</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                )}
        </div>
    )
}