import TeamRoster from "./TeamRoster";

function TeamBreakdown({team}) {

return (
    <div className="mx-2 mt-3 rounded shadow-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <div className="p-2">
            <div className="flex items-center space-x-4">
                <img src={team["logo_url"]} alt="Team Logo" className="w-24 h-24 rounded-full border border-black" 
                    onError={(e) => { e.target.onerror = null; e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG" }}
                />
                <div>
                    {team["streak_type"] === 'WIN' ? 
                        <div>
                            <span className="text-2xl font-bold flex flex-col w-fit gap-2">{team["team_name"]} <span className="text-xl bg-green-200 text-green-700 rounded-full px-2 w-fit">{team["streak_type"]} {team["streak_length"]}</span></span>
                            <p className="text-lg">division: {team["division_name"]}</p>
                            <p className="text-lg">{team["team_abbrev"]}</p>
                        </div>
                    :
                    <div>
                        <span className="text-2xl font-bold flex flex-col w-fit gap-2">{team["team_name"]} <span className="text-xl bg-red-200 text-red-700 rounded-full px-2 w-fit">{team["streak_type"]} {team["streak_length"]}</span></span>
                        <p className="text-lg">division: {team["division_name"]}</p>
                        <p className="text-lg">{team["team_abbrev"]}</p>
                    </div>
                }
                </div>
            </div>
        </div>

        <div className="p-2" id="current+stats">
            <h2 className="text-2xl font-bold mb-4 bg-green-200 rounded w-fit px-2">Current Year Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded shadow border-b border-green-300">
                    <p className="font-bold flex flex-row justify-between">wins
                        <span className="font-light underline text-xs flex justify-center items-center">{team['winsRank']}</span>
                    </p>
                    <p>{team['wins']}</p>
                </div>
                <div className="p-4 bg-white rounded shadow border-b border-green-300">
                    <p className="font-bold flex flex-row justify-between">losses 
                        <span className="font-light underline flex justify-center items-center text-xs">{team['lossesRank']}</span>
                    </p>
                    <p>{team['losses']}</p>
                </div>
                <div className="p-4 bg-white rounded shadow border-b border-green-300">
                    <p className="font-bold flex flex-row justify-between">projected draft rank
                    </p>
                    <p>{team['draft_projected_rank']}
                    </p>
                </div>
               
                <div className="p-4 bg-white rounded shadow border-b border-green-300">
                    <p className="font-bold flex flex-row justify-between">playoff percent
                        <span className="font-light underline flex justify-center items-center text-xs">{team['playoff_pctRank']}</span>
                    </p>
                    <p>{team['playoff_pct'].toFixed(2)}</p>
                </div>
                <div className="p-4 bg-white rounded shadow border-b border-green-300">
                    <p className="font-bold flex flex-row justify-between">points against
                        <span className="font-light underline flex justify-center items-center text-xs">{team['points_againstRank']}</span>
                    </p>
                    <p>{team['points_against'].toFixed(2)}</p>
                </div>

                <div className="p-4 bg-white rounded shadow border-b border-green-300">
                    <p className="font-bold flex flex-row justify-between">points for
                        <span className="font-light underline flex justify-center items-center text-xs">{team['points_forRank']}</span>
                    </p>
                    <p>{team['points_for'].toFixed(2)}</p>
                </div>
                <div className="p-4 bg-white rounded shadow border-b border-green-300">
                    <p className="font-bold">standings rank</p>
                    <p>{team['standing']}</p>
                </div>
                <div className="p-4 bg-white rounded shadow border-b border-green-300">
                    <p className="font-bold flex flex-row justify-between">trades
                        <span className="flex items-center font-light  text-xs underline">{team['tradesRank']}</span>
                    </p>
                    
                    <p>{team['trades']}</p>
                </div>
                <div className="p-4 bg-white rounded shadow border-b border-green-300">
                    <p className="font-bold flex flex-row justify-between">acquisitions
                        <span className="flex font-light items-center text-xs underline">{team['acquisitionsRank']}</span>
                    </p>
                    <p>{team['acquisitions']}</p>
                </div>
            </div>
        </div>

        <div className="p-2" id="historical+stats">
            <h2 className="text-2xl font-bold mb-4 bg-green-200 w-fit rounded px-1">All-time Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded shadow">
                    <p className="font-bold flex flex-row justify-between">playoff wins      
                        <span className="text-xs flex items-center underline ">{team["historical_stats"]["playoff_winsRank"]}</span>
                    </p>
                    <p>{team["historical_stats"]["playoff_wins"]}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <p className="font-bold flex flex-row justify-between">playoff_losses      
                        <span className="text-xs flex items-center underline ">{team["historical_stats"]["playoff_lossesRank"]}</span>
                    </p>
                    <p>{team["historical_stats"]["playoff_losses"]}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <p className="font-bold flex flex-row justify-between">wins
                        <span className="text-xs flex items-center underline ">{team["historical_stats"]["winsRank"]}</span>
                    </p>
                    <p>{team["historical_stats"]["wins"]}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <p className="font-bold flex flex-row justify-between">losses
                        <span className="text-xs flex items-center underline ">{team["historical_stats"]["lossesRank"]}</span>
                    </p>
                    <p>{team["historical_stats"]["losses"]}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <p className="font-bold flex flex-row justify-between">poinst against
                        <span className="text-xs flex items-center underline">{team["historical_stats"]["points_againstRank"]}</span>
                    </p>
                    <p>{team["historical_stats"]["points_against"].toFixed(2)}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <p className="font-bold flex flex-row justify-between">points for
                        <span className="text-xs flex items-center underline">{team["historical_stats"]["points_againstRank"]}</span>
                    </p>
                    <p>{team["historical_stats"]["points_for"].toFixed(2)}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <p className="font-bold flex flex-row justify-between">playoff appearances
                        <span className="text-xs flex items-center underline ">{team["historical_stats"]["playoff_appearancesRank"]}</span>
                    </p>
                    <p>{team["historical_stats"]["playoff_appearances"]}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <p className="font-bold flex flex-row justify-between">championship wins
                        <span className="text-xs flex items-center underline">{team["historical_stats"]["championship_winsRank"]}</span>
                    </p>
                    <p>{team["historical_stats"]["championship_wins"]}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <p className="font-bold flex flex-row justify-between">championship losses
                        <span className="text-xs flex items-center underline">{team["historical_stats"]["championship_winsRank"]}</span>
                    </p>
                    <p>{team["historical_stats"]["championship_losses"]}
                    </p>
                </div>
            </div>
        </div>
        <div className="p-2">
            <h2 className="text-2xl font-bold mb-4 bg-green-200 rounded w-fit px-2">Current Roster</h2>
            <TeamRoster players={team['roster']}></TeamRoster>
        </div>

    </div>
  );
}

export default TeamBreakdown;