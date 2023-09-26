import { getLOGO } from "../fantasyService";

function PerfectRoster(props){
    console.log(props)

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

    function firstNameTruncate(name){
        let firstLast = name.split(" ");

        if(firstLast[1] === "D/ST")
        {
            return firstLast[0]
        }

        return firstLast[0][0] + ". " + firstLast[1];

    }

    return(
        <div className="border-b-4 border-green-600 rounded font-semibold bg-gray-200 p-4">
            {order.map((key)=>{
                if(key === "RB" || key === "WR")
                {
                   return props["data"][key].map((data)=>{
                    return( <div key={key + data[4]} className="grid grid-cols-3 gap-2 w-full text-base border-b border-green-600 items-center py-1" style={{ gridTemplateColumns: '20% 45% 30%' }}>
                            
            
                    <div className="flex flex-row gap-2 items-top justify-between">
                        <p className="text-xs sm:text-sm text-green-700">{key}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col ">
                            <p className="text-sm sm:text-base whitespace-nowrap truncate">{firstNameTruncate(data[0])}</p>
                            <div className="flex flex-row items-center gap-1 justify-start bg-green-200 rounded-full px-1 w-fit">
                                <img alt={data[4]} style={{"width":"15px"}} src={getLOGO(data[4])}></img>
                                
                                <p className="text-xs font-bold text-left">{data[4]}</p>
                            </div>
                        </div>
                        <div id="points+projected_points text-left items-top">
                            <p className="text-sm md:text-base text-left">{data[1]}</p>
                            <p className="font-thin text-xs sm:text-xs text-left">{data[2]}</p>
                        </div>
                    </div>
            
                    <div>
                        <div>
                            <div className="flex flex-row gap-2 justify-end align-right">
                                <p className="font-light text-xs sm:text-xs">Owner</p>

                                <img alt="pfp"
                                onError={(e) => { e.target.onerror = null; e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG" }}
                                style={{
                                        "height":"20px",
                                        "width":"20px",
                                        "borderRadius":"20px"
                                    }} src={data[6][1]}></img>
                            </div>
                            <p className="text-xs sm:text-base/2 text-right whitespace-nowrap truncate">{data[6][0]}</p>
                        </div>
                    </div>
                    
                    </div>)
                    })
                }
                else if(key !== "FLEX")
                {
                    return(
                        <div key = {key + props["data"][key][0][4]} className="grid grid-cols-3 gap-2 w-full text-base border-b border-green-600 items-center py-1" style={{ gridTemplateColumns: '20% 45% 30%' }}>
                            
                    
                            <div className="flex flex-row gap-2 justify-between items-top">
                                <p className="text-xs sm:text-sm text-green-700">{key}</p>
                               
                                
                            </div>
                            
                            <div className="flex flex-row justify-between">
                                <div>
                                    <p className="text-sm sm:text-base whitespace-nowrap text-left">{firstNameTruncate(props["data"][key][0][0])}</p>
                                    <div className="flex flex-row items-center gap-1 justify-start bg-green-200 rounded-full px-1 w-fit">
                                        <img alt={props["data"][key][0][4]} style={{"width":"15px"}} src={getLOGO(props["data"][key][0][4])}></img>
                                        
                                        <p className="text-xs font-bold text-right">{props["data"][key][0][4]}</p>
                                    </div>   
                                </div>
                                <div id="points+projected_points">
                                    <p className="text-sm md:text-base text-left">{props["data"][key][0][1]}</p>
                                    <p className="font-thin text-xs sm:text-xs text-left">{props["data"][key][0][2]}</p>
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
                                            }} src={props["data"][key][0][6][1]}></img>
                                    </div>
                                    <p className="text-xs sm:text-base/2 text-right truncate">{props["data"][key][0][6][0]}</p>
                                </div>
                            </div>
                            
                        </div>
                    );
                    
                }
                else 
                {
                    return(
                        <div key={key+props["data"][4]} className="grid grid-cols-3 gap-2 w-full text-base border-b border-green-600 items-center py-1" style={{ gridTemplateColumns: '20% 45% 30%' }}>
                                
                
                        <div className="flex flex-row gap-2 justify-between">
                            <p className="text-xs sm:text-sm text-green-700">{key}</p>
                                                     
                        </div>
                        
                        <div className="flex flex-row justify-between">
                            <div>
                                <p className="text-sm sm:text-base text-left whitespace-nowrap">{firstNameTruncate(props["data"][key][0])}</p>
                                <div className="flex flex-row items-center gap-1 justify-start bg-green-200 rounded-full px-1 w-fit">
                                    <img alt={props["data"][key][4]} style={{"width":"15px"}} src={getLOGO(props["data"][key][4])}></img>
                                    <p className="text-xs font-bold text-left">{props["data"][key][4]}</p>
                                </div>
                            </div>   
                            <div id="points+projected_points justify-between gap-2">
                                <p className="text-sm md:text-base text-left">{props["data"][key][1]}</p>
                                <p className="font-thin text-xs sm:text-xs text-left">{props["data"][key][2]}</p>
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
                                        }} src={props["data"][key][6][1]}></img>
                                </div>

                                <p className="text-xs sm:text-base/2 text-right whitespace-nowrap truncate">{props["data"][key][6][0]}</p>
                                    
                            </div>
                        </div>
                        
                        </div>
                    );
                }
               
            })}

            <p>Total: <span className="text-green-700">{total.toFixed(2)}</span></p>
            {/* <div className="flex flex-row text-center text-xs text-base sm:text-base md:text-base lg:text-base justify-between truncate"> 
                    <div className='flex flex-col '>
                        <div className='flex flex-col text-left font-bold text-s'>
                            <span>{player.points}</span>
                        </div>
                        <div className='flex flex-col text-left'>
                            <span>{player.projected_points}</span>
                        </div>
                    </div>
                    <div className='flex flex-col text-right overflow-x-hidden'>
                        <span className='font-bold truncate'>{player.name}</span>
                        <span>{player.position}</span>
                    </div>
                    
                </div> 
                
                : 
                         
                <div className="flex flex-row text-center text-base text-xs sm:text-base md:text-base lg:text-base justify-between"> 
                <div className='flex flex-col text-left m-w-0 overflow-x-hidden'>
                    <span className='font-bold truncate'>{player.name}</span>
                    <span>{player.position}</span>
                </div>                
                <div className='flex flex-col'>
                <div className='flex flex-col text-right font-bold'>
                    <span>{player.points}</span>
                </div>
                <div className='flex flex-col text-right'>
                    <span>{player.projected_points}</span>
                </div>
               
                </div>
               
                
                </div> 

            : null) */}
        </div>
    );
}

export default PerfectRoster;