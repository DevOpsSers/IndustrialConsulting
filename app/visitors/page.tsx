"use client"
import MeterReadsTable from "@/components/visitor/MeterReadsTable"
import {useSession, signIn, signOut} from "next-auth/react"
import { redirect } from "next/navigation";


export default function Dashboard(){
    const {data: session} = useSession()

    if(!session){
        redirect('/');
    }

    return( 
        <div className="m-5">
            {(session?.user?.role == "visitor") && 
                <MeterReadsTable/>
            }
        </div>
         
    )
}