import TeamRoster from "./TeamRoster";

function TeamBreakdown({team}) {

 
console.log(team)
  return (
    <div>
        <div class="p-2">
            <div class="flex items-center space-x-4">
                <img src={team["logo_url"]} alt="Team Logo" class="w-24 h-24 rounded-full border border-black"/>
                <div>
                    {team["streak_type"] === 'WIN' ? 
                        <div>
                            <span class="text-2xl font-bold flex flex-col w-fit gap-2">{team["team_name"]} <span className="text-xl bg-green-200 text-green-700 rounded-full px-2 w-fit">{team["streak_type"]} {team["streak_length"]}</span></span>
                            <p class="text-lg">division: {team["division_name"]}</p>
                            <p class="text-lg">{team["team_abbrev"]}</p>
                        </div>
                    :
                    <div>
                        <span class="text-2xl font-bold flex flex-col w-fit gap-2">{team["team_name"]} <span className="text-xl bg-red-200 text-red-700 rounded-full px-2 w-fit">{team["streak_type"]} {team["streak_length"]}</span></span>
                        <p class="text-lg">division: {team["division_name"]}</p>
                        <p class="text-lg">{team["team_abbrev"]}</p>
                    </div>
                }
                </div>
            </div>
        </div>

        <div class="p-2" id="current+stats">
            <h2 class="text-2xl font-bold mb-4 bg-green-200 rounded w-fit px-2">Current Year Stats</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="p-4 bg-white rounded shadow border-b border-green-300">
                    <p class="font-bold">wins</p>
                    <p>{team['wins']}</p>
                </div>
                <div class="p-4 bg-white rounded shadow border-b border-green-300">
                    <p class="font-bold">losses</p>
                    <p>{team['losses']}</p>
                </div>
                <div class="p-4 bg-white rounded shadow border-b border-green-300">
                    <p class="font-bold">projected draft rank</p>
                    <p>{team['draft_projected_rank']}</p>
                </div>
               
                <div class="p-4 bg-white rounded shadow border-b border-green-300">
                    <p class="font-bold">playoff percent</p>
                    <p>{team['playoff_pct'].toFixed(2)}</p>
                </div>
                <div class="p-4 bg-white rounded shadow border-b border-green-300">
                    <p class="font-bold">points against</p>
                    <p>{team['points_against'].toFixed(2)}</p>
                </div>

                <div class="p-4 bg-white rounded shadow border-b border-green-300">
                    <p class="font-bold">points for</p>
                    <p>{team['points_for'].toFixed(2)}</p>
                </div>
                <div class="p-4 bg-white rounded shadow border-b border-green-300">
                    <p class="font-bold">standings rank</p>
                    <p>{team['standing']}</p>
                </div>
                <div class="p-4 bg-white rounded shadow border-b border-green-300">
                    <p class="font-bold">trades</p>
                    <p>{team['trades']}</p>
                </div>
                <div class="p-4 bg-white rounded shadow border-b border-green-300">
                    <p class="font-bold">acquisitions</p>
                    <p>{team['acquisitions']}</p>
                </div>
            </div>
        </div>

        {/* <div class="p-8" id="historical+stats">
        <h2 class="text-2xl font-bold mb-4">All-time Stats</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-4 bg-white rounded shadow">
                <p class="font-bold">Stat 1</p>
                <p>Value 1</p>
            </div>
            <div class="p-4 bg-white rounded shadow">
                <p class="font-bold">Stat 2</p>
                <p>Value 2</p>
            </div>
            <div class="p-4 bg-white rounded shadow">
                <p class="font-bold">Stat 3</p>
                <p>Value 3</p>
            </div>
            <div class="p-4 bg-white rounded shadow">
                <p class="font-bold">Stat 4</p>
                <p>Value 4</p>
            </div>
            <div class="p-4 bg-white rounded shadow">
                <p class="font-bold">Stat 5</p>
                <p>Value 5</p>
            </div>
            <div class="p-4 bg-white rounded shadow">
                <p class="font-bold">Stat 6</p>
                <p>Value 6</p>
            </div>
            <div class="p-4 bg-white rounded shadow">
                <p class="font-bold">Stat 7</p>
                <p>Value 7</p>
            </div>
            <div class="p-4 bg-white rounded shadow">
                <p class="font-bold">Stat 8</p>
                <p>Value 8</p>
            </div>
            <div class="p-4 bg-white rounded shadow">
                <p class="font-bold">Stat 9</p>
                <p>Value 9</p>
            </div>
        </div>
        </div> */}
        <div className="p-2">
            <h2 class="text-2xl font-bold mb-4 bg-green-200 rounded w-fit px-2">Current Roster</h2>
            <TeamRoster players={team['roster']}></TeamRoster>
        </div>

    </div>
  );
}

export default TeamBreakdown;