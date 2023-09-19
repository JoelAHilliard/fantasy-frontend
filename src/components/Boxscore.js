function Boxscore(props){
    const positions_order = ["QB", "RB", "WR", "TE","RB/WR/TE", "D/ST", "K"];

    if(!props.box_score){
        return (<p>no data</p>)
    }

    const sortedBoxScore = props.box_score.sort((a, b) => positions_order.indexOf(a.position) - positions_order.indexOf(b.position));
    console.log(sortedBoxScore)
    return (
        sortedBoxScore.map(player => (

            (player.slot_position !== "BE" && player.slot_position !== "IR" ?
            // depending of if left or right side
                props.order ?
                
                <div className="flex flex-row text-center text-xs text-base sm:text-base md:text-base lg:text-base justify-between truncate"> 
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

            : null)
        ))
    );
}

export default Boxscore;