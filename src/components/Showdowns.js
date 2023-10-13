import { useEffect, useState } from "react";
import { getVersus } from "../fantasyService";
import Loading from '../assets/3-dots-move.svg'
import TeamMiniMatchup from "./TeamMiniMatchup";
import { animated,useTransition } from 'react-spring';

function Showdowns(props) {

    const curr_team_id = props.curr_team['team_id'];
    const [showMatchups, setShowMatchups] = useState(false);
    useEffect(() => {
        // Reset state when props.curr_team['team_id'] changes
        setData(null);
        setLoading(null);
        setSelectedTeam('default');
    }, [curr_team_id]);
    

    const transitions = useTransition(showMatchups, {
        from: { opacity: 0, transform: 'translateY(-50%)' },
        enter: { opacity: 1, transform: 'translateY(0%)' },
        leave: { opacity: 0, transform: 'translateY(-50%)' },
        config: { tension: 600, friction: 60 },
      });

    const [loading,setLoading] = useState(null);

    const [data,setData] = useState(null);

    const [selectedTeam,setSelectedTeam] = useState('null');


    const changeOpposingTeam = async (event) => {
        setShowMatchups(false);

        setData(null)
        setLoading(true);
        const data = await getVersus(props.curr_team['team_id'],event.target.value);
        setData(data)
        setLoading(false);

    }
    
    const generateShowdown = () => {

        const curr_team_id = props.curr_team['team_id'];

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

        return(<div className="p-4 bg-white shadow-lg rounded-md">
                    <div className="flex flex-col gap-2 mb-4 z-200">
                        <span className="text-lg">Total matchups: <span className="font-bold">{total_matches}</span></span>
                        <span className="text-lg">Record: <span className="font-bold text-green-500">{wins}</span> - <span className="font-bold text-red-500">{losses}</span></span>
                        <span className="text-lg">Points scored: <span className="font-bold">{points_scored.toFixed(2)}</span></span>
                        <span className="text-lg">Points against: <span className="font-bold">{points_against.toFixed(2)}</span></span>
                    </div>

                    <div className="mt-6">
                    </div>
                 
                    <div className="my-4 max-w-lg relative z-10 flex flex-col items-left justify-start">
                        <button
                            className="w-[75%] sm:w-[45%] bg-green-500 text-white p-2 rounded-lg"
                            onClick={() => setShowMatchups(prev => !prev)}
                        >
                            Show recent matchups
                        </button>
                        {transitions(
                            (styles, item) => item && (
                            <animated.div  style={styles}>
                                <div className="mt-4">
                                    <div>
                                        <h1 className="text-xl font-bold mb-4">Recent Matchups</h1>
                                        {/* <select defaultValue={"sort by"} >
                                            <option value={"latest"}>ascending</option>
                                            <option value={"latest"}>descending</option>
                                        </select> */}
                                    </div>
                                    <div>
                                        {data.sort((a,b) =>{ return b.year - a.year}).map((matchup) => {
                                            return (
                                                <TeamMiniMatchup key={matchup['home_score']} matchup={matchup} curr_team_id={curr_team_id} />
                                            );
                                        })}
                                    </div>
                                </div>
                            </animated.div>
                            )
                        )}
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
                    <option value='default' disabled>Select team</option>
                    {
                        props.teams.map((team) => {
                            if(team["team_id"] === props.curr_team["team_id"]) return null;
                            
                            return(<option key = {team['team_id']} value={team['team_id']}>{team["team_name"]}</option>);
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