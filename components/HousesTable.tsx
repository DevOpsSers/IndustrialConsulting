'use client';

import { useState, useEffect } from "react";
import HousesForms from "./forms/HousesForms";
import { useMutation } from "react-query"
import axios from "axios";
import Alert from "./utils/Alert";
import Link from 'next/link'
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import useCloudinary from "./hooks/useCloudinary";


async function getHouses(){
    const response = await fetch(`http://localhost:3000/api/houses/getAll?start=${new Date().toISOString().slice(0,16)}&end=${new Date().toISOString().slice(0,16)}`)
    const data = await response.json()
    return data
}
  
export default function HousesTable() {

    const [section, setSection] = useState("all");

    const [houses, setHouses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchHouses(section) {
        const data = await getHouses();

        if (section == "empty"){
            setHouses(data.filter(item => item.available === 'true'));
        }else if (section == "occupied"){
            setHouses(data.filter(item => item.available === 'false'));
        }else{
            setHouses(data)
        }

        setIsLoading(false)
    }

    useEffect(() => {    
        fetchHouses(section);
    }, [section]);


    const { isSuccess, isError, mutate } = useMutation(
        (houses: BookingValues) => {
          setShowModal(false)
          
          return axios.post(
            "http://localhost:3000/api/houses/create",
            houses,
            { withCredentials: true }
          );
        },
        {
          onSuccess: () => {
            fetchHouses();
          },
        }
      );
    
    const [showModal, setShowModal] = useState(false);
        
    const {Cloudinary} = useCloudinary();

    return (
        <div className="">
            <div className="mt-8 pt-8 pb-8 font-bold text-2xl">Houses</div>
            {isError && 
                <Alert
                    variant="warning"
                    label="There was an error adding your house"
                />
            }
            {isSuccess && 
                <Alert
                    variant="success"
                    label="House was added succesfully!"
                />
            }
            <div  className="bg-white rounded-lg">  
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-4 text-center">
                    <button className={`rounded-xl p-2 ${section=="all" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('all')}>All Bookings</button>
                    <button className={`rounded-xl p-2 ${section=="empty" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('empty')}>Empty</button>
                    <button className={`rounded-xl p-2 ${section=="occupied" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('occupied')}>Occupied</button>
                    <button></button> 
                    <button className="bg-blue-100 rounded-xl p-2 hover:bg-blue-300 hover:cursor-pointer" onClick={() => setShowModal(true)}>+ Add House</button> 
                </div>
                <hr/>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                <div className="table-auto w-full bg-white rounded-2xl">
                    {houses.length > 0 ? (
                        houses.map((house) => (
                        <div key={house.id} className="bg-green-100 rounded-2xl flex m-8 lg:card-side bg-base-100 shadow-xl">
                            <div className="p-4 max-w-lg">
                                <AdvancedImage className="rounded-2xl" cldImg={Cloudinary.image(house.image_url).resize(thumbnail().width(300).height(200))} />
                            </div>
                            <div className="p-4">
                                <h1  className="font-bold">{house.house_name}</h1>
                                <p>{house.address_line_1}</p>
                                <p>{house.address_line_2}</p>
                                <Link 
                                    href={`/dashboard/houses/${house.house_id}`}
                                >
                                    <button className="bg-blue-300 font-bold rounded-xl p-2 w-full m-8">See</button>
                                </Link>
                            </div>
                            <div>
                                {house.available =="false" && (
                                    <p className="font-extrabold text-red-900 border-8 rounded-3xl border-red-900 p-2 m-8">Occupied</p>
                                )}

                                {house.available =="true" && (
                                    <p className="font-extrabold text-green-900 border-8 rounded-3xl border-green-900 p-2 m-8">Empty</p>
                                )}
                            </div>
                            
                        </div>))) : (
                            <tr>
                                <td>No houses available</td>
                            </tr>
                    )}
                </div>)}
            </div>
            
            {showModal ? (
                <>
                <div
                    className="justify-center pt-80 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Add House
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
                        <HousesForms onSubmit={(r) => mutate(r)}/>
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