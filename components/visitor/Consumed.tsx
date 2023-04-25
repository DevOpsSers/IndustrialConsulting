import QR from "../utils/QR"

export default function Consumed({booking_id}) {
    
    return (
        <div className="m-8 p-4 grid place-items-center	">
            <p className="mb-8" >The counter will upload every time you upload a new Meter Read!</p>
            <div className="flex">
                <div className="text-7xl font-mono">
                    34 KW/h
                </div>
                {/* <button   className="content-center m-5 my-10 p-2 rounded-2xl bg-blue-100 font-bold">Download QR Code!</button> */}
            </div>
        </div>
    )
}