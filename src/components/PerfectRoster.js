import { getHeadshot, getLOGO } from "../fantasyService";

function PerfectRoster(props){

    const order = ["QB","RB","WR","TE","FLEX","D/ST","K"]
    let total = 0;

    // add up total
    order.map((key)=>{
        if(key === "RB" || key === "WR")
        {
            props["data"][key].map((data)=>{
                total = total + data[1]
                return null
            })
        }
        else if(key !== "FLEX")
        {
            total = total + props["data"][key][0][1]
            
        }
        else 
        {
            total = total + props["data"][key][1]
        }
        return null;
    })

   

    return(
        <div className="border-b-4 border-green-600 rounded font-semibold bg-gray-200 p-4">
            {order.map((key)=>{
                if(key === "RB" || key === "WR")
                {
                   return props["data"][key].map((data)=>{
                        return playerRow(data,key)
                    })
                }
                else if(key !== "FLEX")
                {
                    return (playerRow(props["data"][key][0],key))
                }
                else 
                {
                    return(
                        playerRow(props["data"][key],key)
                    );
                }
            })}

            <p>Total: <span className="text-green-700">{total.toFixed(2)}</span></p>
      
        </div>
    );
}

const playerRow = (player,key) => {
    return(
        <div key={key+player[4]} className="grid grid-cols-3 gap-2 w-full text-base border-b border-green-600 items-center py-1" style={{ gridTemplateColumns: '15% 50% 30%' }}>
                

        <div className="flex flex-row gap-2 justify-between">
            <p className="text-xs sm:text-sm text-green-700">{key}</p>
                                    
        </div>
        
        <div className="flex flex-row justify-between">
            <div>
                <p className="text-sm sm:text-base text-left whitespace-nowrap flex flex-row gap-1"><img alt={player[0][4]} style={{"width":'25px'}} src={getHeadshot(player[7])}></img>{firstNameTruncate(player[0])}</p>
                <div className="flex flex-row">

                    <div className="flex flex-row items-center gap-1 justify-start bg-green-200 rounded-full px-1 w-fit">
                        <img alt={player[4]} style={{"width":"15px"}} src={getLOGO(player[4])}></img>
                        <p className="text-xs font-bold text-left">{player[4]}</p>
                    </div>

                    {player[6][2] === "BE" ? 
                    <div className="whitespace-nowrap font-xs py-0 flex flex-row items-center w-fit bg-orange-200 rounded-full px-1 h-fit" style={{"fontSize":"10px", "lineHeight": "1", "padding": "2px 0"}}>
                        <p className="m-0 px-1">bench warmer</p>
                    </div>
                : null}
                </div>
            </div>   
            <div id="points+projected_points justify-between gap-2">
                <p className="text-sm md:text-base text-right">{player[1]}</p>
                <p className="font-thin text-xs sm:text-xs text-right">{player[2]}</p>
            </div>
        </div>
        <div>
            <div>
                <div className="flex flex-row gap-2 justify-end">
                    <p className="font-light text-xs sm:text-xs">Owner</p>

                    <img alt="pfp" style={{
                            "height":"20px",
                            "width":"20px",
                            "borderRadius":"20px"
                        }} src={player[6][1]}></img>
                </div>

                <p className="text-xs sm:text-base/2 text-right whitespace-nowrap truncate">{player[6][0]}</p>
                    
            </div>
        </div>
        
        </div>
    );
}



function firstNameTruncate(name){
    let firstLast = name.split(" ");

    if(firstLast[1] === "D/ST")
    {
        return firstLast[0]
    }
    if(firstLast.length > 2){
        let lastName = firstLast[1] + " " + firstLast[2]
        firstLast[1] = lastName;
    }

    return firstLast[0][0] + ". " + firstLast[1];

}
export default PerfectRoster;