import PeopleShow from "../../../../components/people/PeopleShow"

export default function User({params}){
    const id = params.id
    return( 
        <div className="m-5">
                <PeopleShow user_id={id}/>
        </div>
         
    )
}