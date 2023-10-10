import { getLOGO } from "../fantasyService";

function Boxscore(props){
    const positions_order = ["QB", "RB", "WR", "TE","RB/WR/TE", "D/ST", "K"];

    if(!props.box_score){
        return (<p>no data</p>)
    }
    function firstNameTruncate(name){
        let firstLast = name.split(" ");

        if(firstLast[1] === "D/ST")
        {
            return firstLast[0]
        }

        return firstLast[0][0] + ". " + firstLast[1];

    }
    const sortedBoxScore = props.box_score.sort((a, b) => positions_order.indexOf(a.position) - positions_order.indexOf(b.position));
    return (
        sortedBoxScore.map(player => (
            <div >
                {(player.slot_position !== "BE" && player.slot_position !== "IR" ?
                    // depending of if left or right side
                    props.order ?
                    
                    <div className="flex flex-row text-center text-sm text-base sm:text-base md:text-base lg:text-base justify-between truncate border-b py-1 border-green-600"> 
                        <div className='flex flex-col'>
                            <div className='flex flex-col text-left font-bold'>
                                <span>{player.points}</span>
                            </div>
                            <div className='flex flex-col text-left'>
                                <span className="text-xs">{player.projected_points}</span>
                            </div>
                        </div>
                        <div className='flex flex-col justify-end text-right overflow-x-hidden'>
                            <span className='font-bold truncate'>{firstNameTruncate(player.name)}</span>
                            <div className="justify-end bg-green-400 px-1 rounded w-fit justify-end" style={{"marginLeft":"auto"}}>
                                <div className="flex flex-row gap-1 ml-a" >
                                    <span className='text-xs font-light truncate'>{player.proTeam}</span>
                                    <img alt="logo" style={{"width":"15px","height":'15px'}} src={getLOGO(player.proTeam)}></img>
                                </div>
                            </div>
                        </div>
                        
                    </div> 
                    
                    : 
                            
                    <div className="flex flex-row text-center text-base text-sm sm:text-base md:text-base lg:text-base justify-between py-1 border-b border-green-600"> 
                    <div className='flex flex-col text-left m-w-0 overflow-x-hidden'>
                        <span className='font-bold truncate'>{firstNameTruncate(player.name)}</span>
                        <div className="justify-start bg-green-400 px-1 rounded w-fit ">
                            <div className="flex flex-row gap-1 justify-end">
                                <span className='text-xs font-light truncate'>{player.proTeam}</span>
                                <img alt="logo" style={{"width":"15px","height":'15px'}} src={getLOGO(player.proTeam)}></img>
                            </div>
                        </div>
                    </div>                
                    <div className='flex flex-col'>
                    
                        <div className='flex flex-col text-right font-bold'>
                            <span>{player.points}</span>
                        </div>

                        <div className='flex flex-col text-right'>
                            <span className="text-xs">{player.projected_points}</span>
                        </div>
                
                    </div>
                
                    
                    </div> 

                : null)}
            </div>
        ))
    );
}

export default Boxscore;