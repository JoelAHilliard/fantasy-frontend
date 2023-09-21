import {  useState, useEffect } from 'react';

import { getLTS } from '../fantasyService';

import Loading from '../assets/loading_circle.svg';
// import Boxscore from './Boxscore';
import PerfectRoster from "./PerfectRoster";
import PercentageBar from './PercentageBar';


function WeeklyBreakdown(){
    const [data,setData] = useState(null);

    function getData(){
        getLTS()

        .then(responseData => {
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
            }
            setData(responseData);
        })
        .catch(error => {
            console.error("Failed to get matchups:", error);
        });
    }

   
    useEffect(() => {
        getData();
     },[]);

    return(
        <div className='flex flex-col gap-2'>
            

            <div id="matchups" className="flex flex-col gap-2">
                <div className='flex flex-col'>
                    <span className='font-bold'>Matchups</span>
                    <span className='font-light text-xs'>Week 2</span>
                </div>
               
                <div className="flex flex-row overflow-x-scroll gap-2 w-50">
                    {data ? data['matchups'].map((matchup)=>{
                        return(
                           
                            <div key={matchup.matchupNum} className="grid grid-cols-2 gap-5 text-center rounded-lg border-b-4 bg-gray-200 border-green-600 shadow-lg px-2 text-xs text-base sm:text-sm md:text-sm lg:text-lg  min-w-fit py-4 truncate">
                                {/* Team Headers & Scores */}
                                <div className="col-span-1 text-right" id="home_team">
                                    
                                    {
                                        matchup.home_score > matchup.away_score ? 
                                            <div className='font-semibold'>{matchup.home_team} - 👑</div> 
                                        :   <div className='font-semibold'>{matchup.home_team}</div>
                                    }
                                    {matchup.home_score > 0 ?
                                        <div className='flex flex-col justify-left p-0'>
                                            <div className='font-bold text-base'>{matchup.home_score}</div>
                                            <div className='text-xs'>{matchup.home_projected.toFixed(2)}</div>
                                        </div>                            
                                    :null}
                                </div>
                                <div className="col-span-1 text-left" id="away_team">
                                    {/* if championship and away team won show crown */}
                                    {
                                        
                                        matchup.home_score < matchup.away_score ? 
                                            <div className='font-semibold'>👑 - {matchup.away_team}</div> 
                                        :   <div className='font-semibold'>{matchup.away_team}</div>
                                     

                                    }
                                    {matchup.away_score > 0 ?
                                    <div className='flex flex-col justify-left p-0'>
                                        <div className='font-bold text-base'>{matchup.away_score}</div>
                                        <div className='text-xs'>{matchup.away_projected.toFixed(2)}</div>
                                    </div> 
                                     
                                    :null} 
                                </div>
                                    
                                {/* <div id="col1" className="border-r border-green-600 pr-5">
                                    {Array.isArray(matchup.home_team_lineup) ?
                                        <Boxscore box_score = {matchup.home_team_lineup}></Boxscore>
                                        : null
                                    }
                                
                                </div>
                                
                                <div id="col2">
                                {Array.isArray(matchup.away_team_lineup) ?
                                    <Boxscore box_score={matchup.away_team_lineup} order={'rev'}></Boxscore>
                                    :
                                    null
                                }
                                </div> */}
                            
                            </div>
                        );
                    }) : <img alt="loading" style={{"width":"50px"}} src={Loading}></img>}
                
                </div>
            </div>
            {data ? <PerfectRoster data={data["perfect_roster"]}></PerfectRoster>: null}

            <div id="team_performamnces" className='w-full'>
                <div className='flex flex-row gap-2 mb-2 items-center'>
                    <span className='font-bold'>Team Performances</span>
                    <span className='underline font-light text-xs'>actual vs proj.</span>
                </div>
               
                    { data ? data['matchups'].map((matchup) =>{
                        console.log(matchup)
                        return(
                            <div key={matchup['home_score']}>

                            {/* <img src={matchup['away_team']}></img> */}
                            <div className='flex flex-row w-full justify-between items-center'>
                                <div>
                                    <p className='font-bold text-base'>{matchup['away_team']}</p>
                                    <div className='flex flex-row gap-2'>
                                        <span className='font-bold text-xs'>{matchup['away_score'].toFixed(2)}</span>
                                        <span className='font-light text-xs'>{matchup['away_projected'].toFixed(2)}</span>
                                    </div> 
                                </div>
                                <div className='flex flex-row gap-2 justify-between'>
                                    <span className='text-sm text-green-700'>{(matchup['away_score']/matchup['away_projected'] * 100).toFixed(0) }%</span>
                                </div> 
                            </div>

                            <PercentageBar dividend={matchup['away_score']} divisor={matchup['away_projected']}></PercentageBar>
                            
                            <div className='flex flex-row w-full justify-between items-center'>
                                <div>
                                    <p className='font-bold text-base'>{matchup['home_team']}</p>
                                    <div className='flex flex-row gap-2'>
                                        <span className='font-bold text-xs'>{matchup['home_score'].toFixed(2)}</span>
                                        <span className='font-light text-xs'>{matchup['home_projected'].toFixed(2)}</span>
                                    </div> 
                                </div>
                                <div className='flex flex-row gap-2 justify-between'>
                                    <span className='text-sm text-green-700'>{(matchup['home_score']/matchup['home_projected'] * 100).toFixed(0) }%</span>
                                </div> 
                            </div>
                            
                            <PercentageBar dividend={matchup['home_score']} divisor={matchup['home_projected']}></PercentageBar>
                            </div>
                        );
                    }) : null}
            </div>
            <div id="standings_power_rankings" className=''>
                <div className="flex flex-row justify-left gap-1 truncate">
                    <div id="standings" className='flex flex-col w-1/2 text-left gap-2'>
                        <p className='font-bold'>Standings</p>
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
                        }) : <p>loading</p>}
                    </div>
                    <div id='power_rankings' className='flex flex-col gap-2 w-1/2'>
                        <p className='font-bold'>Power Rankings</p>
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

            <div id="top_low_scorers" className='flex flex-row w-full justify-left gap-2'>
                <div className='w-1/2 bg-gray-200 border-b-4 border-green-600 rounded p-1'>
                    {data ? 
                        <div className='flex flex-rows items-center justify-between text-sm'>
                                <div>
                                    <p className='font-semibold whitespace-nowrap'>Top Scorer - 🔥</p>
                                    <div className='flex flex-row gap-2'>
                                        <p>{data['misc_data'].top_scorer[0]}</p>
                                    </div>
                                </div>
                                <div className='align-right font-bold text-lg'>
                                    <p>{data['misc_data'].top_scorer[1]}</p>
                                </div>
                            </div>
                        
                        : null}
                </div>
                <div className='w-1/2 bg-gray-200 border-b-4 border-green-600 rounded p-1'>
                    {data ? 
                       <div className='flex flex-rows items-center justify-between text-sm'>
                            <div>
                                <p className='font-semibold whitespace-nowrap'>Lowest Scorer - 💩</p>
                                <div className='flex flex-row gap-2'>
                                    <p>{data['misc_data'].lowest_scorer[0]}</p>
                                </div>
                            </div>
                            <div className='align-right font-bold text-lg'>
                                <p>{data['misc_data'].lowest_scorer[1]}</p>
                            </div>
                        </div>
                       
                    : null}
                </div>
            </div>
            
        </div>
       
    )
}

export default WeeklyBreakdown;