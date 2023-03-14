"use client"; // this is a client component 👈🏽

import Calendar from "../../../components/Calendar"

export default function Dashboard(){

    return( 
        <div className="m-5">
            Calendar
            <Calendar/>
        </div>
         
    )
}