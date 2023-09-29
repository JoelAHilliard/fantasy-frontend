const apiURL = "https://nssyfantasyapi-production.up.railway.app/"
// const apiURL = "http://localhost:30030/"


export async function getMatchups(year)
{
    const response = await fetch(apiURL+"matchups?year="+year);

    const matchupData = response.json();

    return matchupData;
}

export async function getLeaderboard()
{
    const response = await fetch(apiURL+"leaderboard");

    const leaderboard = response.json();

    return leaderboard;
}
export async function getLTS()
{
    const response = await fetch(apiURL+"lts");

    const leaderboard = response.json();

    return leaderboard;
}

export async function getDraftData(year)
{
    const response = await fetch(apiURL+"getDraftData?year="+year);

    const leaderboard = response.json();

    return leaderboard;
}
export function getLOGO(team_abbr)
{
    return "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/"+team_abbr+".png&h=200&w=200&transparent=true"
}
export function getHeadshot(player_id)
{
    return "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/"+player_id+".png&w=426&h=320&cb=1&transparent=true"

}
