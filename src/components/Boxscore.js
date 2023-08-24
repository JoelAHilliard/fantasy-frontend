function Boxscore(props){

    if(!props.box_score){
        return (<p>no data</p>)
    }

    return (
        props.box_score.map(player => (

            (player.slot_position !== "BE" || player.slot_position !== "IR" ?
            // depending of if left or right side
                props.order ?
                
                <div className="flex flex-row text-center text-xs text-base sm:text-lg md:text-lg lg:text-2xl justify-between"> 
                    <div className='flex flex-col'>
                        <div className='flex flex-col text-left font-bold text-s'>
                            <span>{player.points}</span>
                        </div>
                        <div className='flex flex-col text-left'>
                            <span>{player.projected_points}</span>
                        </div>
                    </div>
                    <div className='flex flex-col text-right'>
                        <span className='font-bold'>{player.name}</span>
                        <span>{player.position}</span>
                    </div>
                    
                </div> : 
                         
                <div className="flex flex-row text-center text-base text-xs sm:text-lg md:text-lg lg:text-2xl justify-between"> 
                <div className='flex flex-col text-left'>
                    <span className='font-bold'>{player.name}</span>
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