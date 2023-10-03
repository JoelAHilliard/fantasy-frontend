import { getHeadshot } from "../fantasyService";

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
              <h2 className="text-xl font-bold mb-2">{player.position} - {player.name}</h2>
              <p>{player.proTeam}</p>
              <p>Total Points: {player.total_points}</p>
              <p>Projected Total Points: {player.projected_total_points}</p>
              <p>Ownership: {player.percent_owned.toFixed(2)}%</p>
              <p>Started: {player.percent_started.toFixed(2)}%</p>
              <p>Position Rank: {player.pos_rank}</p>
              <p className="mt-2 flex gap-2">
                Injury Status: 
                <span className={player.injured ? 'text-red-500' : 'text-green-500'}>
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