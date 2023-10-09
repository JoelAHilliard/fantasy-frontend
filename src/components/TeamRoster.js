import { getHeadshot, getLOGO } from "../fantasyService";

function TeamRoster(players){
    return(
        <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players["players"].sort((a,b)=>{
            return (b.projected_total_points - a.projected_total_points)
        }).map((player, index) => (
          <div 
            key={index}
            className="bg-white rounded shadow transform transition-transform duration-500 hover:scale-105 overflow-hidden"
          >
            <img src={getHeadshot(player.playerId)} alt={player.name} onError={(e) => { e.target.onerror = null; e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG" }} className="w-full h-48 object-cover mb-4"/>
            
            <div className="p-4">
              <div className="flex flex-row justify-between">
                <h2 className="text-xl font-bold mb-2">{player.name}</h2>
                <div className="flex flex-row items-center gap-1 justify-start bg-green-200 rounded px-1 py-0 w-fit">
                  <img alt={player.proTeam} style={{"width":"15px"}} src={getLOGO(player.proTeam)}></img>
                  <p className="text-sm font-bold text-right">{player.proTeam}</p>
                </div>  
              </div> 
              <p>Total Points: <span className="font-bold">{player.total_points}</span></p>
              <p>Projected Total Points: <span className="font-bold">{player.projected_total_points}</span></p>
              <p>Ownership: <span className="font-bold">{player.percent_owned.toFixed(2)}%</span></p>
              <p>Started: <span className="font-bold">{player.percent_started.toFixed(2)}%</span></p>
              <p>Position Rank: <span className="font-bold">{player.pos_rank}</span></p>
              <p className="mt-2 flex gap-2">
                Injury Status: 
                <span className={player.injured ? 'text-red-500 font-bold' : 'text-green-500 font-bold'}>
                  {player.injuryStatus}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    );

}

export default TeamRoster;