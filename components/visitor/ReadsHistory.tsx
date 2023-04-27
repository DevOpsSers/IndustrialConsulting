import { useState, useEffect } from "react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import useCloudinary from "./../hooks/useCloudinary";

async function getReads(booking_id){
    const response = await fetch(`http://localhost:3000/api/reads/ofBooking/${booking_id}`)
    const data = await response.json()
    return data
}

export default function ReadsHistory({booking_id}) {

    const [reads, setReads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchReads(section=null) {
        const data = await getReads(booking_id);
        setReads(data);
        setIsLoading(false)
    }

    useEffect(() => {
        
        fetchReads();
    }, []);

    const {Cloudinary} = useCloudinary();
    
    return (
        <div className="">
             {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="table-auto w-full bg-white rounded-2xl max-h-96 overflow-auto">
                    {reads.length > 0 ? (
                        reads.map((read) => (
                            <div key={read.id} className="bg-green-100 rounded-2xl flex m-8 lg:card-side bg-base-100 shadow-xl">
                                <div className="p-4 max-w-lg">
                                    <AdvancedImage className="rounded-2xl" cldImg={Cloudinary.image(read.img_url).resize(thumbnail().width(150).height(100))} />
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
                                    <p>Posted by: {read.User.name}</p>
                                    
                                </div>
                                
                            </div>
                     ))
                     ) : (
                         <tr>
                             <td>No reads yet!</td>
                         </tr>
                     )}
                </div>)}
        </div>
    )
}