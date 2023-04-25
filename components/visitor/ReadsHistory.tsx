import { useState, useEffect } from "react";

async function getReads(){
    const response = await fetch(`http://localhost:3000/api/reads/getAll`)
    const data = await response.json()
    return data
}

export default function ReadsHistory({booking_id}) {

    const [reads, setReads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchReads(section=null) {
        const data = await getReads(section);
        setReads(data);
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
                    <div className="table-auto w-full bg-white rounded-2xl">
                    {reads.map((read) => (
                        <div className="bg-green-100 rounded-2xl flex m-8 lg:card-side bg-base-100 shadow-xl">
                            <div className="p-4 max-w-lg">
                                <img className="rounded-2xl w-64" src={read.img_url} alt="Album"/>
                            </div>
                            <div className="m-8">
                                <div className="flex">
                                    <div className="rounded-md font-semibold">
                                        Uploaded on: 
                                    </div>
                                    <div className="rounded-md font-semibold ml-2 ">
                                        <div>{new Date(read.created_at).toLocaleDateString('en-US', { timeZone: 'UTC' })}</div> 
                                        <div>{new Date(read.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'UTC' })}</div> 
                                    </div>
                                </div>
                                <p>Value: {read.value}</p>
                                <p>Posted by: {read.Users.name} {read.Users.surname}</p>
                                
                            </div>
                            
                        </div>
                    ))}
                </div>)}
        </div>
    )
}