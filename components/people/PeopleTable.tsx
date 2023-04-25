'use client';

import { useState, useEffect } from "react";
import UsersForms from "./../forms/UsersForms";
// import { UserValues } from "./../forms/UsersForms";
import { useMutation } from "react-query"
import axios from "axios";
import Alert from "./../utils/Alert";
import Link from 'next/link'
import Image from "next/image";


async function getUsers(section){

    const response = await fetch(`http://localhost:3000/api/users/getAll?section=${section}`)
    const data = await response.json()
    return data
}
  
export default function PeopleTable() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [section, setSection] = useState("all");
    
    function changeSection(section){
        setSection(section)
        fetchUsers(section)
    }


    async function fetchUsers(section=null) {
        const data = await getUsers(section);
        setUsers(data);
        setIsLoading(false)
    }

    useEffect(() => {
        
        fetchUsers();
    }, []);


    const { isSuccess, isError, mutate } = useMutation(
        (user: UserValues) => {
          setShowModal(false)
          alert(JSON.stringify(user))
          return axios.post(
            "http://localhost:3000/api/users/create", user,
            { withCredentials: true }
          );
          
        },
        {
          onSuccess: () => {
            fetchUsers();
          },
        }
      );
    
    const [showModal, setShowModal] = useState(false);
        
    return (
        <div className="">
            <div className="mt-8 pt-8 pb-8 font-bold text-2xl">People</div>
            {isError && 
                <Alert
                    variant="warning"
                    label="There was an error adding your user "
                />
            }
            {isSuccess && 
                <Alert
                    variant="success"
                    label="User was added succesfully!"
                />
            }
            <div  className="bg-white rounded-lg">  
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-4 text-center">
                    <button className={`rounded-xl p-2 ${section=="all" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => changeSection('all')}>Everyone</button>
                    <button className={`rounded-xl p-2 ${section=="admins" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => changeSection('admins')}>Admins</button>
                    <button className={`rounded-xl p-2 ${section=="visitors" ? 'bg-blue-300 font-bold' : 'bg-blue-100'} `} onClick={(e) => changeSection('visitors')}>Visitors</button>
                    <div></div> 
                    <div className="bg-blue-100 rounded-xl p-2 hover:bg-blue-300 hover:cursor-pointer" onClick={() => setShowModal(true)}>+ Add User</div> 
                </div>
                <hr/>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                <table className="table-auto w-full bg-white rounded-2xl">
                    <tbody>    
                        <tr>
                            <th>Customer</th>
                            <th>Role</th>
                            <th>Details</th>
                        </tr>

                        {users.length > 0 ? (
                            users.map((people) => (
                                <tr key={people.id}>
                                    
                                    <td>
                                        <div className="flex m-2 bg-green-100 rounded-md">
                                            <div className="m-2">
                                                {people.image && (
                                                    <Image className="inline-block h-16 w-16 rounded-md" width={16} height={16} alt={people.id} src={people.image}></Image>

                                                )}
                                            </div>
                                            
                                            <div className="m-2">    
                                                <div className="font-bold">{people.name}</div>
                                                <div>{people.email}</div>
                                                <div>{people.phone_number}</div>
                                            </div>   
                                        </div> 
                                    </td>
                                    <td>
                                        <div className="grid place-items-center	">
                                            <button   className="content-center my-5 p-3 rounded-2xl bg-blue-100 font-bold">{people.role}</button>
                                        </div>
                                    </td>
                                    <td>
                                        <Link 
                                            href={`/dashboard/people/${people.id}`}
                                        >
                                        <div className="grid place-items-center	">                                            
                                            <button   className="content-center my-5 p-3 rounded-2xl bg-blue-100 font-bold">Details</button>
                                        </div> 
                                        </Link>
                                    </td>
                                </tr>
                                ))
                        ) : (
                            <tr>
                                <td>No users available</td>
                            </tr>
                        )}
                    </tbody>
                </table>)}
            </div>
            
            {showModal ? (
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Add User
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
                        <UsersForms onSubmit={(r) => mutate(r)}/>
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