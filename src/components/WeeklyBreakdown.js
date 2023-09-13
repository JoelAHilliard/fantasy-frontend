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
            <div className="flex flex-col gap-2">
                <div className='flex flex-col'>
                    <span className='font-bold'>Matchups</span>
                    <span className='font-light text-xs'>Week 1</span>
                </div>
               
                <div className="flex flex-row overflow-x-scroll gap-2">
                    {data ? data['matchups'].map((matchup)=>{
                        return(
                            <div key={matchup.matchupNum} className="grid grid-cols-2 gap-5 text-center rounded-lg border-b-4 bg-gray-200 border-green-600 shadow-lg px-2 text-xs text-base sm:text-sm md:text-sm lg:text-lg whitespace-nowrap min-w-fit py-4">
                                {/* Team Headers & Scores */}
                                <div className="col-span-1">
                                    {/* if championship and home team won show crown */}
                                    {matchup.playoff_type === "championship" ?
                                        
                                        matchup.home_score > matchup.away_score ? 
                                            <div>{matchup.home_team} - 👑</div> 
                                        :   <div>{matchup.home_team}</div>

                                        : 
                                        <div className='font-semibold'>{matchup.home_team}
                                            <img alt="logo" src={matchup.logo_url}></img>
                                        </div>

                                    }
                                    {matchup.home_score > 0 ?
                                        <div>{matchup.home_score}</div>                                
                                    :null}
                                </div>
                                <div className="col-span-1">
                                    {/* if championship and away team won show crown */}
                                    {matchup.playoff_type === "championship" ?
                                        
                                        matchup.home_score < matchup.away_score ? 
                                            <div>{matchup.away_team} - 👑</div> 
                                        :   <div>{matchup.away_team}</div>

                                        : 
                                        <div className='font-bold'>
                                            {matchup.away_team}
                                        </div>

                                    }
                                    {matchup.away_score > 0 ? 
                                        <div>{matchup.away_score}</div>
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

            <div id="standings_power_rankings" className='bg-green-100 rounded border border-green-600 px-4'>
                <div className="flex flex-row justify-left">
                    <div id="standings" className='flex flex-col w-1/2 text-left'>
                        <p className='font-bold'>Standings</p>
                        {data ? data['misc_data']['standings'].map((team,index)=>{
                            return(
                                <span key={team}>{index+1 + ". " + team}</span>
                            );
                        }) : <p>loading</p>}
                    </div>
                    <div id='power_rankings' className='flex flex-col'>
                <p className='font-bold'>Power Rankings</p>
                {data ? Object.keys(data['power_rankings'][0])
                .sort((teamA, teamB) => {
                    const scoreA = data['power_rankings'][0][teamA].score;
                    const scoreB = data['power_rankings'][0][teamB].score;
                    return scoreB - scoreA; // for descending order; use scoreA - scoreB for ascending
                })
                .map((team,index)=>{
                    return(
                        <span key={team}>{index+1 + ". " + team}</span>
                    );
                }) : <p>loading</p>}
                    </div>
                </div>             
            </div>

            <div id="top_low_scorers" className='flex flex-row w-full justify-left bg-green-100 border border-green-600 px-4 rounded'>
                <div className='w-1/2'>
                    <p className='font-bold'>Lowest Scorer</p>

                    {data ? 
                        <div className='flex flex-row gap-2'>
                            <p>{data['misc_data'].lowest_scorer[0]}</p>
                            <p>{data['misc_data'].lowest_scorer[1]}</p>
                        </div>
                    : null}
                </div>
                <div className='w-1/2'>
                    <p className='font-bold'>Highest Scorer</p>
                    {data ? 
                        <div className='flex flex-row gap-2'>
                            <p>{data['misc_data'].lowest_scorer[0]}</p>
                            <p>{data['misc_data'].lowest_scorer[1]}</p>
                        </div>
                    : null}
                </div>
            </div>
            
        </div>
       
    )
}

export default WeeklyBreakdown;