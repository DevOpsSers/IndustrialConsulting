'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import UsersEditForms from "@/components/forms/UsersEditForms"
import { useMutation } from "react-query"
import axios from "axios";
import Alert from "./../utils/Alert";

import { usePathname } from 'next/navigation';



async function getUser(id){
    const response = await fetch(`http://localhost:3000/api/users/${id}`)
    const data = await response.json()
    return data
}


  
export default function PeopleShow({user_id}) {

    const pathname = usePathname();

    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [section, setSection] = useState("general");

    async function fetchUser(user_id) {
        const data = await getUser(user_id);
        setUser(data);
        setIsLoading(false)
    }

    useEffect(() => {
        fetchUser(user_id);
    }, []);

    const { isSuccess, isError, mutate } = useMutation(
        (user: UserValues) => {
           
            return axios.post(
            `http://localhost:3000/api/users/${user_id}`, user,
            { withCredentials: true }
          );
          
        },
        {
          onSuccess: () => {
            fetchUser(user_id);
          },
        }
      );
        
    return (
        <div className="">
            {isLoading ? (
                    <div>Loading...</div>
                ) : (
            <>
            <div className="mt-8 pt-8 pb-8 font-bold text-2xl">{user.name}´s User Page</div>
            <div  className="bg-white rounded-lg">  
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4 text-center">
                    <button className={`rounded-xl p-2 ${section=="general" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('general')}>General</button>
                    <button className={`rounded-xl p-2 ${section=="edit" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => setSection('edit')}>Edit</button>
                   
                </div>
                <hr/>
               
                <div className="w-full bg-white rounded-2xl">
                    {section=="general" && (
                        <div className="flex">
                            {user.image &&(
                                <div className="p-8 w-32">
                                    <Image className="inline-block h-16 w-16 rounded-full" width={16} height={16} src={user.image} alt={user}></Image>
                
                                </div>
                            )}
                            <div className="p-4">
                                <h1  className="font-bold">{user.name} {user.surname}</h1>
                                <p>{user.email}</p>
                                <p>{user.phone_number}</p>
                                <br/>
                                <h1  className="font-bold">Role: {user.role}</h1>
                            </div>
                        </div> 
                    )}
                    {section=="edit" && (
                        <div className="justify-center p-16">
                            {isError && 
                                <Alert
                                    variant="warning"
                                    label="There was an error updating user"
                                />
                            }
                            {isSuccess && 
                                <Alert
                                    variant="success"
                                    label="User was added succesfully!"
                                />
                            }
                            <UsersEditForms onSubmit={(r) => mutate(r)} user={user}/>
                        </div> 
                    )}
                </div>
                
            </div>
            </>)}
        </div>
    )
}