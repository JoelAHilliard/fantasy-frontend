import {  useState, useEffect } from 'react';

import { getLTS } from '../fantasyService';

// import Boxscore from './Boxscore';
import PerfectRoster from "./PerfectRoster";
import PercentageBar from './PercentageBar';
import Loading from '../assets/3-dots-move.svg'


function WeeklyBreakdown(){
    const [data,setData] = useState(null);
    const [boxScores,setboxScores] = useState(null);

    const [topScore,setTopScore]= useState(0);
    const [lowScore,setLowScore]= useState(0);
    
    function perfectTeamRoster(team)
    {
        const order = ["QB","RB","WR","TE","FLEX","D/ST","K"]

        let total_score = 0;

        let sorted_team = {
            "QB":[],
            "RB":[],
            "WR":[],
            "TE":[],
            "FLEX":[],
            "D/ST":[],
            "K":[]
        };
      
        if(team === null){
            return null;
        }
        console.log(order)
        for (const key in order) {
            for(let item in team)
            {
                if(team[item]["position"] === order[key])
                {
                    console.log('here')
                    sorted_team[order[key]].push(team[item])
                }
            }
            
        }
        for (let key in sorted_team)
            {
                if(key !== "FLEX")
                {
                    sorted_team[key] = sorted_team[key].sort((a,b)=>{
                        return b.points - a.points;
                    })
                }   
            }
        

        if(sorted_team["RB"][2].points < sorted_team["WR"][2].points)
        {
            sorted_team["FLEX"] = [sorted_team["WR"][2]]
        }
        else{
            console.log(sorted_team)
            sorted_team["FLEX"] = [sorted_team["RB"][2]]
        }

        for(let item in sorted_team)
        {
            if(item !== "RB" && item !== "WR")
            {
                total_score = total_score + sorted_team[item][0].points;
            }
            else
            {
                total_score = total_score + sorted_team[item][0].points;
                total_score = total_score + sorted_team[item][1].points;
            }
        }

        return total_score
       
    }

   
    useEffect(() => {
        function getData(){
            getLTS()
    
            .then(responseData => {
                let allMatchups = []
                let topScore = 0;
                let lowestScore = 99999;
                for(let item in responseData["matchups"])
                {
                    
                    if(responseData["matchups"][item]["away_score"] > topScore && responseData["matchups"][item]["away_score"] != null)
                    {
                        topScore = responseData["matchups"][item]["away_score"]
                    }
                    if(responseData["matchups"][item]["home_score"]  > topScore && responseData["matchups"][item]["home_score"] != null)
                    {
                        topScore = responseData["matchups"][item]["home_score"]
                    }
                    if(responseData["matchups"][item]["away_score"]  < lowestScore && responseData["matchups"][item]["away_score"] != null)
                    {
                        lowestScore = responseData["matchups"][item]["away_score"]
                    }
                    if(responseData["matchups"][item]["home_score"] < lowestScore && responseData["matchups"][item]["home_score"] != null)
                    {
                        lowestScore = responseData["matchups"][item]["home_score"]
                    }
                }

                setTopScore(topScore);
                setLowScore(lowestScore);
                for(let item in responseData["matchups"])
                {
                    let homeProj = 0;
                    let awayProj = 0;
                
                    for (let player in responseData["matchups"][item]["away_team_lineup"])
                    {
                        if(responseData["matchups"][item]["away_team_lineup"][player]["slot_position"] !== "BE")
                        {
                            awayProj = awayProj + responseData["matchups"][item]["away_team_lineup"][player]["projected_points"]
                        }
                    }
                    for (let player in responseData["matchups"][item]["home_team_lineup"])
                    {
                        if(responseData["matchups"][item]["home_team_lineup"][player]["slot_position"] !== "BE")
                        {
                            homeProj = homeProj + responseData["matchups"][item]["home_team_lineup"][player]["projected_points"]
                        }
                    }
                    responseData["matchups"][item]["away_projected"] = awayProj
                    responseData["matchups"][item]["home_projected"] = homeProj
                    
                    responseData["matchups"][item]["away_perfect_score"] = perfectTeamRoster(responseData["matchups"][item]["away_team_lineup"]) || 0
                    responseData["matchups"][item]["home_perfect_score"] = perfectTeamRoster(responseData["matchups"][item]["home_team_lineup"]) || 0
                   
                    allMatchups.push({
                        "score":responseData["matchups"][item]["away_score"] || 0,
                        "perfect_score":responseData["matchups"][item]["away_perfect_score"],
                        "team_logo":responseData["matchups"][item]["away_team_logo"],
                        "team_name":responseData["matchups"][item]["away_team"]
                    })
                    allMatchups.push({
                        "score":responseData["matchups"][item]["home_score"] || 0,
                        "perfect_score":responseData["matchups"][item]["home_perfect_score"],
                        "team_logo":responseData["matchups"][item]["home_team_logo"],
                        "team_name":responseData["matchups"][item]["home_team"]
                    })
                }

                setboxScores(allMatchups);
                setData(responseData);
            })
            .catch(error => {
                console.error("Failed to get matchups:", error);
            });
        }
        getData();
    },[]);

    return(
        data ? <div>
            <div className='flex flex-col gap-2'>
                        
                <div id="matchups" className="flex flex-col gap-2">
                    <div className='flex flex-row items-center gap-2 p-1 rounded bg-green-200 w-fit'>
                        <span className='font-bold'>Matchups</span>
                        <span className='font-light text-xs underline'>Week 11</span>
                    </div>
                    <div className='flex flex-col p-2'>
                        <div className='flex flex-col gap-2 w-full justify-center'>
                            {data ? data['matchups'].map((matchup) => (
                                <div key={matchup.matchupNum} className='grid items-center bg-white p-2 rounded-lg shadow-lg grid-cols-1 md:grid-cols-3'>
                                    
                                    {/* Home Team */}
                                    <div className='flex flex-col items-center md:items-end gap-1 px-1'>
                                        <div className={matchup.home_score > matchup.away_score ? 'font-bold text-green-500 whitespace-nowrap flex flex-col items-center' : 'font-bold whitespace-nowrap flex flex-col items-center'} 
                                            title={matchup.home_team} style={{fontSize: '1rem' }}>
                                                {topScore === matchup.home_score ? <span className='text-xs bg-green-200 rounded-full px-1 text-center text-white-600'>top scorer</span>:null} {lowScore === matchup.home_score ? <span className='text-xs bg-red-200 rounded-full px-1 text-red-600'>underperformer</span>:null} <span>{matchup.home_team}</span> 
                                        </div>

                                        {matchup.home_score > 0 && (
                                            <div className='flex flex-row gap-1 items-center md:items-end gap-1'>
                                                <div className='font-semibold' style={{ fontSize: '0.8rem' }}>
                                                    {matchup.home_score > matchup.away_score && <span className='ml-1 text-yellow-400'>👑 </span>}
                                                    {matchup.home_score}
                                                    
                                                </div>
                                                <div className='text-xs text-gray-500'>
                                                    {matchup.home_projected.toFixed(2)}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* VS Separator */}
                                    <div className='flex font-semibold items-center text-center justify-center my-1 md:my-0 h-fit w-full px-2 text-white rounded' style={{ fontSize: '0.8rem' }}>
                                        <span className='w-fit bg-green-600 px-2 rounded'>VS</span>
                                    </div>

                                    {/* Away Team */}
                                    <div className='flex flex-col items-center md:items-start gap-1 px-1 mt-1 md:mt-0'>
                                        <div className={matchup.away_score > matchup.home_score ? 'font-bold text-green-500 whitespace-nowrap flex flex-col items-center' : 'font-bold whitespace-nowrap flex flex-col items-center'} 
                                            title={matchup.away_team} style={{fontSize: '1rem' }}>
                                            {topScore === matchup.away_score ? <span className='text-xs bg-green-200 rounded-full px-1 text-center text-white-600'>top scorer</span>:null} {lowScore === matchup.away_score ? <span className='text-xs bg-red-200 rounded-full px-1 text-red-600'>underperformer</span>:null} <span>{matchup.away_team}</span> 
                                        </div>

                                        {matchup.away_score > 0 && (
                                            <div className='flex flex-row gap-1 items-center md:items-start gap-1'>
                                                <div className='font-semibold' style={{ fontSize: '0.8rem' }}>
                                                    {matchup.away_score > matchup.home_score && <span className='mr-1 text-yellow-400'>👑</span>}
                                                    {matchup.away_score}
                                                </div>
                                                <div className='text-xs text-gray-500'>
                                                    {matchup.away_projected.toFixed(2)}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )) : <img alt="loading" style={{ "width": "50px" }} src={Loading} />}
                        </div>
                    </div>






                </div>

                <h1 className='items-center p-1 rounded bg-green-200 w-fit font-bold'>Perfect Roster</h1>
                
                {data ? <PerfectRoster data={data["perfect_roster"]}></PerfectRoster>: null}

                <div id="team_performamnces" className='w-full'>
                    <div className='flex flex-row gap-2 mb-2 items-center p-1 rounded bg-green-200 w-fit'>
                        <span className='font-bold'>Team Performances</span>
                        <span className='underline font-light text-xs'>actual vs max</span>
                    </div>
                        { boxScores ? boxScores
                        .sort((a,b) =>{
                            return (b["score"]/b["perfect_score"]) - (a["score"]/a["perfect_score"])
                        })
                         .map((matchup) =>{
                            return(
                                <div>
                                    <div key={matchup['team_name']}>

                                {/* <img src={matchup['away_team']}></img> */}
                                    <div className='flex flex-row w-full justify-between items-center'>
                                        <div>
                                            <div className='flex flex-row gap-2 items-center mb-1'>
                                                <img alt={"pfp"} style={{"height":"20px","width":"20px"}} className='rounded-full' src={matchup["team_logo"]} onError={(e) => { e.target.onerror = null; e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG" }}/>
                                                <p className='font-bold text-base'>{matchup['team_name']}</p>
                                            </div>
                                            <div className='flex font-light flex-row gap-2 bg-green-200 w-fit rounded-full px-1 items-center mb-1'>
                                                <span className='font-bold text-sm'>{matchup['score'].toFixed(2)}</span>
                                                <span className='font-normal text-xs'>{matchup['perfect_score'].toFixed(2)}</span>
                                            </div> 
                                        </div>
                                        <div className='flex flex-row gap-2 justify-between'>
                                            <span className='text-sm text-green-700'>{(matchup['score']/matchup['perfect_score'] * 100).toFixed(0) }%</span>
                                        </div> 
                                    </div>

                                    <PercentageBar dividend={matchup['score']} divisor={matchup['perfect_score']}></PercentageBar>
                                
                                    </div>
                                </div>  
                            );
                        }) : null }
                </div>

                <div id="standings_power_rankings" >
                    <div className="flex flex-row justify-left gap-1 truncate">
                        <div id="standings" className='flex flex-col w-1/2 text-left gap-2'>
                            <p className='font-bold p-1 rounded bg-green-200 w-fit '>Standings</p>
                            {data ? data['misc_data']['standings'].map((team,index)=>{
                                return(
                                    <div key={index} className='flex flex-row gap-1 text-xs items-center whitespace-nowwrap overflow-x-hidden truncate border-b-4 bg-gray-200 border-green-600 rounded-lg p-2' >
                                        <p>{index+1 + ". "}</p>
                                        <img alt="pfp" className='rounded-full' style={{"width":"20px","height":"20px"}} src={data['misc_data']['standings'][index][2]} onError={(e) => { e.target.onerror = null; e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG" }}></img>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row gap-2'>
                                                <span key={team}>{data['misc_data']['standings'][index][0]}</span>
                                            </div>
                                            <span className='font-bold' key={team}>{data['misc_data']['standings'][index][3]}</span>
                                        </div>
                                        
                                        
                                    </div>
                                );
                            }) : null}
                        </div>
                        <div id='power_rankings' className='flex flex-col gap-2 w-1/2'>
                            <p className='font-bold p-1 rounded bg-green-200 flex items-center gap-2 w-fit'>Power Rankings <span className='underline text-xs font-light'>espn</span></p>
                            {data ? Object.keys(data['power_rankings'][0])
                            .sort((teamA, teamB) => {
                                const scoreA = Number(data['power_rankings'][0][teamA].score);
                                const scoreB = Number(data['power_rankings'][0][teamB].score);
                            
                            
                                return scoreB - scoreA; 
                            })
                            .map((team,index,record)=>{
                                return(
                                    <div key={team} className='flex flex-row gap-1 items-center text-xs border-b-4 bg-gray-200 border-green-600 rounded-lg p-2 truncate'>
                                            <span>{index+1}. </span>
                                            <img alt="pfp" className='rounded-full' style={{"width":"20px","height":"20px"}} src={data['power_rankings'][0][team].team_logo} onError={(e) => { e.target.onerror = null; e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG" }}></img>
                                        
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row gap-2'>
                                            </div>
                                            <span>{team}</span>
                                            <span className='font-bold'>{data['power_rankings'][0][team].record}</span>
                                        </div>
                                    </div>
                                );
                            }) : <p>loading</p>}
                        </div>
                    </div>             
                </div>

                {/* <div id="top_low_scorers" className='flex flex-row w-full justify-left gap-2'>
                    <div className='w-1/2 bg-gray-200 border-b-4 border-green-600 rounded p-1'>
                        {data ? 
                            <div className='flex flex-rows items-center justify-between text-sm'>
                                    <div>
                                        <p className='font-semibold whitespace-nowrap'>Top Scorer 🔥</p>
                                        <div className='flex flex-row gap-2'>
                                            <p>{data['misc_data'].top_scorer[0]}</p>
                                        </div>
                                    </div>
                                    <div className='align-right font-bold text-sm'>
                                        <p>{data['misc_data'].top_scorer[1]}</p>
                                    </div>
                                </div>
                            
                            : null}
                    </div>
                    <div className='w-1/2 bg-gray-200 border-b-4 border-green-600 rounded p-1'>
                        {data ? 
                        <div className='flex flex-rows items-center justify-between text-sm'>
                                <div>
                                    <p className='font-semibold whitespace-nowrap'>Lowest Scorer 💩</p>
                                    <div className='flex flex-row gap-2'>
                                        <p>{data['misc_data'].lowest_scorer[0]}</p>
                                    </div>
                                </div>
                                <div className='align-right font-bold text-sm'>
                                    <p>{data['misc_data'].lowest_scorer[1]}</p>
                                </div>
                            </div>
                        
                        : null}
                    </div>
                </div> */}
                        
            </div>
        </div>:<img alt='loading' className='w-1/4 mx-auto' src={Loading}></img>
        
       
    )
}

export default WeeklyBreakdown;
