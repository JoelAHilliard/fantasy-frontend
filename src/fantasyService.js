// const apiURL = "https://crypto-bun-api-production.up.railway.app/"
const apiURL = "http://localhost:30030/"


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
