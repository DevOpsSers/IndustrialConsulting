export default function HouseShowGeneral({booking}) {
    
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
                <div className="p-4 w-52">
                    <img className="rounded-2xl" src={booking.Users.profile_picture_url} alt="Album"/>
                </div>
                <div className="p-4">
                    <h1  className="font-bold">{booking.Users.name} {booking.Users.surname}</h1>
                    <p>{booking.Users.email}</p>
                    <p>{booking.Users.phone_number}</p>
                    <br/>
                    <h1  className="font-bold">Since: {new Date(booking.created_at).toLocaleDateString('en-US', { timeZone: 'UTC' })}</h1>
                    <h1  className="font-bold">Role: {booking.Users.role}</h1>
                </div>
            </div> 
            <hr/>
            <div className="flex">
                <div className="p-4  w-52">
                    <img className="rounded-2xl" src={booking.Houses.image_url} alt="Album"/>
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