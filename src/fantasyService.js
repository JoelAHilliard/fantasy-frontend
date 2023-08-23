const apiURL = "http://127.0.0.1:5000/matchups/2019/1"

export function getMatchups(year,week)
{
    const response = fetch(apiURL);

    const matchupData = response.json();

    return matchupData;

}

