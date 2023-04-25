import HouseShow from "../../../../components/HouseShow/HouseShow"

export default function House({params}){
    const id = params.id
    return( 
        <div className="m-5">
                <HouseShow house_id={id}/>
        </div>
         
    )
}