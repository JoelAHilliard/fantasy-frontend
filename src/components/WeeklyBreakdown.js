import {  useState, useEffect } from 'react';

import { getLTS } from '../fantasyService';

import Loading from '../assets/loading_circle.svg';
// import Boxscore from './Boxscore';


function WeeklyBreakdown(){
    const [data,setData] = useState(null);

    function getData(){
        getLTS()

        .then(responseData => {

            setData(responseData);

        })
        .catch(error => {
            console.error("Failed to get matchups:", error);
        });
    }

    function getHighestAndLowestScorers(){
    }

    useEffect(() => {
        getData();
        getHighestAndLowestScorers();
     },[]);

    return(
        <div className='flex flex-col gap-2'>
            <div id="matchups" className="flex flex-col gap-2">
                <div className='flex flex-col'>
                    <span className='font-bold'>Matchups</span>
                    <span className='font-light text-xs'>Week 1</span>
                </div>
               
                <div className="flex flex-row overflow-x-scroll gap-2">
                    {data ? data['matchups'].map((matchup)=>{
                        return(
                            <div key={matchup.matchupNum} className="grid grid-cols-2 gap-5 text-center rounded-lg border-b-4 bg-gray-200 border-green-600 shadow-lg px-2 text-xs text-base sm:text-sm md:text-sm lg:text-lg whitespace-nowrap min-w-fit py-4 truncate">
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
                                            <div>{matchup.home_projected.toFixed(2)}</div>
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
                                        <div>{matchup.away_projected.toFixed(2)}</div>
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

            <div id="standings_power_rankings" className=''>
                <div className="flex flex-row justify-left gap-1 truncate">
                    <div id="standings" className='flex flex-col w-1/2 text-left gap-2'>
                        <p className='font-bold'>Standings</p>
                        {data ? data['misc_data']['standings'].map((team,index)=>{
                            return(
                                <div key={index} className='flex flex-row gap-1 text-xs items-center whitespace-nowwrap overflow-x-hidden truncate border-b-4 bg-gray-200 border-green-600 rounded-lg p-2' >
                                    <p>{index+1 + ". "}</p>
                                    <img alt="pfp" className='rounded-full' style={{"width":"20px","height":"20px"}} src={data['misc_data']['standings'][index][2]} onError={(e) => { e.target.onerror = null; e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG" }}></img>
                                    <span key={team}>{data['misc_data']['standings'][index][0]}</span>
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
                        
                            console.log(`Team A: ${teamA}, Score A: ${scoreA}`);
                            console.log(`Team B: ${teamB}, Score B: ${scoreB}`);
                        
                            return scoreB - scoreA; 
                        })
                        .map((team,index)=>{
                            return(
                                <div key={team} className='flex flex-row gap-1 items-center text-xs border-b-4 bg-gray-200 border-green-600 rounded-lg p-2 truncate'>
                                    <span >{index+1 + ". " + team}</span>
                                    <img alt="pfp" className='rounded-full' style={{"width":"20px","height":"20px"}} src={data['power_rankings'][0][team].team_logo} onError={(e) => { e.target.onerror = null; e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG" }}></img>
                                </div>
                            );
                        }) : <p>loading</p>}
                    </div>
                </div>             
            </div>

            <div id="top_low_scorers" className='flex flex-row w-full justify-left gap-2'>
                <div className='w-1/2 bg-gray-200 border-b-4 border-green-600 rounded p-1'>
                    {data ? 
                        <div className='flex flex-rows items-center justify-between'>
                                <div>
                                    <p className='font-bold'>Highest Scorer - 🔥</p>
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
                       <div className='flex flex-rows items-center justify-between'>
                            <div>
                                <p className='font-bold'>Lowest Scorer 💩</p>
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