"use client"
import BookingsTable from "@/components/BookingsTable"
import {useSession, signIn, signOut} from "next-auth/react"
import { redirect } from "next/navigation";


export default function Dashboard(){
    const {data: session} = useSession()

    if(!session){
        redirect('/');
    }

    return( 
        <div className="m-5">
            {(session?.user?.role == "admin" || session?.user?.role == "owner") && 
            
                <BookingsTable/>
            }
        </div>
         
    )
}