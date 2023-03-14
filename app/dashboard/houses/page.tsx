import HousesTable from "../../../components/HousesTable"

export default function Dashboard(){

    return( 
        <div className="m-5">
            <div className="p-4 font-bold w-full"> Houses</div>
                <HousesTable/>
        </div>
         
    )
}