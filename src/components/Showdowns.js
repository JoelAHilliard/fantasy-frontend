import { useEffect, useState } from "react";
import { getVersus } from "../fantasyService";
import Loading from '../assets/3-dots-move.svg'


function Showdowns(props) {

    const curr_team_id = props.curr_team['team_id'];

    useEffect(() => {
        // Reset state when props.curr_team['team_id'] changes
        setData(null);
        setLoading(null);
        setSelectedTeam('default');
    }, [curr_team_id]);
    
    
    const [loading,setLoading] = useState(null);

    const [data,setData] = useState(null);

    const [selectedTeam,setSelectedTeam] = useState('null');


    const changeOpposingTeam = async (event) => {
        setData(null)
        setLoading(true);
        const data = await getVersus(props.curr_team['team_id'],event.target.value);
        setData(data)
        setLoading(false);

    }
    
    const generateShowdown = () => {

        


        const curr_team_id = props.curr_team['team_id'];

        console.log(curr_team_id)

        let total_matches = 0;
        let wins = 0;
        let losses = 0;
        let points_scored = 0;
        let points_against = 0;


        data.forEach(element => {
            total_matches += 1
            if(element["away_team_id"] === curr_team_id){
                points_scored += element["away_score"]
                points_against += element["home_score"]
                
                if(element["away_score"] > element["home_score"])
                {
                    wins+=1
                }
                else
                {
                    losses += 1
                }
            }
            else{
                points_scored += element["home_score"]
                points_against += element["away_score"]
                
                if(element["away_score"] < element["home_score"])
                {
                    wins+=1
                }
                else
                {
                    losses += 1
                }
            }
        });

        // const chart_data = {
        //     labels: ['Wins', 'Losses'],
        //     datasets: [
        //       {
        //         data: [wins, losses],
        //         backgroundColor: [
        //           'rgba(75, 192, 192, 0.6)',
        //           'rgba(255, 99, 132, 0.6)',
        //         ],
        //         hoverOffset: 4
        //       }
        //     ]
        //   };

        return(<div className="p-4 bg-white shadow-lg rounded-md">
        <div className="flex flex-col gap-2 mb-4">
            <span className="text-lg">Total matchups: <span className="font-bold">{total_matches}</span></span>
            <span className="text-lg">Record: <span className="font-bold text-green-500">{wins}</span> - <span className="font-bold text-red-500">{losses}</span></span>
            <span className="text-lg">Points scored: <span className="font-bold">{points_scored.toFixed(2)}</span></span>
            <span className="text-lg">Points against: <span className="font-bold">{points_against.toFixed(2)}</span></span>
        </div>

        <div className="mt-6">
        </div>

        {/* Chart.js Component Integration Here */}
    </div>);

    }

    //select other teams, see breakdowns    
    return (
        
        <div className="p-2 text-sm phaucette bg-gray-150 rounded-lg relative flex flex-col">
            <span className="">{props.curr_team["team_name"]} vs 
                    <select 
                        className="mt-2" 
                        value={selectedTeam} 
                        onChange={(event) => {
                            setSelectedTeam(event.target.value);
                            changeOpposingTeam(event);
                        }}>
                    <option value='default' selected disabled>Select team</option>
                    {
                        props.teams.map((team) => {
                            if(team["team_id"] === props.curr_team["team_id"]) return null;
                            
                            return(<option value={team['team_id']}>{team["team_name"]}</option>);
                        })
                    }
                </select>
            </span>
            {loading ?  <img alt="loading" style={{ "width": "50px" }} src={Loading} /> : null}
            
            {data ? 
                generateShowdown()
            :
                null
            }       
        </div>
    
    );
}

export default Showdowns;