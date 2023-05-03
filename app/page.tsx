"use client"
import React from "react";
import {useSession, signIn, signOut} from "next-auth/react"
import { redirect } from "next/navigation";
import house from ".././public/images/forest-house.jpg";
import Image from "next/image";

export default function Dashboard(){
  const {data: session} = useSession()

  
  if(session?.user?.role == "admin" || session?.user?.role == "owner"){
    redirect('/dashboard');
  }
  
  if(session?.user?.role == "visitor" ){
    redirect('/visitors');
  }

  return( 
      <div>
        <br/>
        

          {session?.user  && (
            <div>
              Redirecting...

            </div>
          )}
          {!session  && (
            <div>
            <div className="bg-gradient-to-tl from-lime-100 to-green-200 w-full py-16 px-4">
              <h1 className="text-5xl font-bold tracking-tight text-yellow-700 sm:text-5xl text-center">
                New Forest Escapes
              </h1>
              <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-5 sm:py-12 lg:py-12">
                  <div className=" sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                      <Image
                        className="h-auto max-w-full rounded-lg "
                        src={house}
                        alt={"forest house"}
                        width={500}
                        height={300}
                      ></Image>
                    </div>
                  </div>
                  <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-yellow-700 sm:text-4xl">
                      Energy responsable housing
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-yellow-700">
                      New forest housing is a company that rent houses in the New
                      forest area with a responsible managin of energy.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <button
                        onClick={() => signIn()}
                        className="rounded-md bg-lime-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
                </div>
        </div>
        </div>
          )}
      </div>
       
  )
}