import HouseOwnersTable from "../../../components/HouseOwnersTable"

export default function Dashboard(){

    return( 
        <div className="bg-slate-100 h-screen">
            <div className="p-5 font-bold"> HouseOwners</div>
            <div className="m-5">
                <HouseOwnersTable/>
            </div>
        </div>
         
    )
}