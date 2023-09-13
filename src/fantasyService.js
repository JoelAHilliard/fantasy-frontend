const apiURL = "https://fantasy-api-production.up.railway.app/"


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
