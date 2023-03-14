import StaffTable from "components/StaffTable"

export default function Dashboard(){

    return( 
        <div className="m-5">
            <div className="m-5 mt-10">Team Members</div>
            <StaffTable/>
        </div>
         
    )
}