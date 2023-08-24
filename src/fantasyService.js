const apiURL = "https://fantasy-api-production.up.railway.app/"

export async function getMatchups(year)
{
    const response = await fetch(apiURL+"matchups?year="+year);

    const matchupData = response.json();

    return matchupData;

}

