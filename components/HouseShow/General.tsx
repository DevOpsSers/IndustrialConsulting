export default function HouseShowGeneral({house}) {
    
    return (
        <div className="m-8">
            <div className="flex">
                <div className="p-4 max-w-lg">
                    <img className="rounded-2xl" src={house.image_url} alt="Album"/>
                </div>
                <div className="p-4">
                    <h1  className="font-bold">{house.house_name}</h1>
                    <p>{house.address_line_1}</p>
                    <p>{house.address_line_2}</p>
                    <br/>
                <h1  className="font-bold">KW/H Price: {house.kw_h_cost}</h1>
                </div>

            </div> 
        </div>
    )
}