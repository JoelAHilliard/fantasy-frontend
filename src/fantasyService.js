const apiURL = "https://fantasyapi-production.up.railway.app/"
// const apiURL = "http://localhost:30030/"

const LEAGUEID = process.env.REACT_APP_LEAGUEID || 30030;

export const ACTIVE_YEARS = process.env.REACT_APP_ACTIVE_YEARS || 2023;

export const NavBarTitle = process.env.REACT_APP_APP_TITLE || "Fantasy Stats";


export async function getMatchups(year)
{
    const response = await fetch(apiURL+"matchups?year="+year+"&league_id="+LEAGUEID);

    const matchupData = response.json();

    return matchupData;
}
export async function getTeams()
{
    const response = await fetch(apiURL+"getTeams?league_id="+LEAGUEID);

    const matchupData = response.json();

    return matchupData;
}
export async function getLeaderboard()
{
    const response = await fetch(apiURL+"leaderboard?league_id="+LEAGUEID);

    const leaderboard = response.json();

    return leaderboard;
}
export async function getLTS()
{
    const response = await fetch(apiURL+"lts?league_id="+LEAGUEID);

    const leaderboard = response.json();

    return leaderboard;
}

export async function getDraftData(year)
{
    const response = await fetch(apiURL+"getDraftData?year="+year+"?league_id="+LEAGUEID);

    const leaderboard = response.json();

    return leaderboard;
}

export async function getVersus(curr_team_id,opposing_team_id)
{
    const response = await fetch(apiURL+"getVersusData?league_id="+LEAGUEID+'&my_team_id='+String(curr_team_id)+"&challenger_id="+String(opposing_team_id));

    const versusData = response.json();

    return versusData;
}
export function getLOGO(team_abbr)
{
    return "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/"+team_abbr+".png&h=200&w=200&transparent=true"
}
export function getHeadshot(player_id)
{
    return "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/"+player_id+".png&w=426&h=320&cb=1&transparent=true"

}
