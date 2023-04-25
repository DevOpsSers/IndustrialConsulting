"use client"
import React from "react";
import {useSession, signIn, signOut} from "next-auth/react"

export default function Dashboard(){
  const {data: session} = useSession()

  return( 
      <div className="m-5">
        {JSON.stringify(session)}
        <br/>
        

          {session?.user  && (
            <div>
              <div>Welcome {session.user.email}</div>
              <button onClick={()=>signOut()}>Sign Out</button>

            </div>
          )}
          {!session  && (
            <div>
              <div> Not signed in</div>
              <button onClick={()=>signIn()}>Sign In</button>
              <br/>
              <button onClick={()=>signOut()}>Sign Out</button>

            </div>
          )}
      </div>
       
  )
}