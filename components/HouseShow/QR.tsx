import QR from "../../components/utils/QR"

export default function HouseShowQR({url}) {
    
    return (
        <div className="m-8 p-4 grid place-items-center	">
            <p className="mb-8" >This QR code must be placed next to your reader. So your visitors can update their electricity consumption!</p>
            <div className="flex">
                <button   className="content-center m-5 my-10 p-2 rounded-2xl bg-blue-100 font-bold">Download QR Code!</button>
                <QR value={url} />
            </div>
        </div>
    )
}