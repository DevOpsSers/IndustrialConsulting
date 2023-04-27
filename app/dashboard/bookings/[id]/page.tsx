import BookingShow from "../../../../components/BookingShow/BookingShow"

export default function Booking({params}){
    const id = params.id
    return( 
        <div className="m-5">
                <BookingShow booking_id={id}/>
        </div>
         
    )
}