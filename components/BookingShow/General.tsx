import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import useCloudinary from "./../hooks/useCloudinary";
import Image from "next/image";

export default function HouseShowGeneral({booking}) {
    
    const {Cloudinary} = useCloudinary();

    return (
        <div className="m-8">
            <div className="flex">
                <div className="p-4">
                    <h1  className="font-bold">From: {new Date(booking.start_date).toLocaleDateString('en-US', { timeZone: 'UTC' })} {new Date(booking.start_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'UTC' })}</h1>
                    <h1  className="font-bold">To: {new Date(booking.end_date).toLocaleDateString('en-US', { timeZone: 'UTC' })} {new Date(booking.end_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'UTC' })}</h1>
                    <br/>
                    <h1  className="font-bold">Booked on: {new Date(booking.created_at).toLocaleDateString('en-US', { timeZone: 'UTC' })} {new Date(booking.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'UTC' })}</h1>
                </div>
            </div> 
            <hr/>
            <div className="flex">
                <div className="p-4 w-32">
                    <Image className="inline-block h-16 w-16 rounded-full" width={16} height={16} src={booking.User.image} alt={booking.User}></Image>

                </div>
                <div className="p-4">
                    <h1  className="font-bold">{booking.User.name} {booking.User.surname}</h1>
                    <p>{booking.User.email}</p>
                    <p>{booking.User.phone_number}</p>
                    <br/>
                    <h1  className="font-bold">Member since: {new Date(booking.created_at).toLocaleDateString('en-US', { timeZone: 'UTC' })}</h1>
                    <h1  className="font-bold">Role: {booking.User.role}</h1>
                </div>
            </div> 
            <hr/>
            <div className="flex">
                <div className="p-4  w-52">
                    <AdvancedImage className="rounded-2xl" cldImg={Cloudinary.image(booking.Houses.image_url).resize(thumbnail().width(150).height(100))} />

                </div>
                <div className="p-4">
                    <h1  className="font-bold">{booking.Houses.house_name}</h1>
                    <p>{booking.Houses.address_line_1}</p>
                    <p>{booking.Houses.address_line_2}</p>
                    <br/>
                <h1  className="font-bold">KW/H Price: {booking.Houses.kw_h_cost}</h1>
                </div>

            </div> 
        </div>
    )
}