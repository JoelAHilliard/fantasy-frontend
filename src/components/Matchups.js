
import {  useState } from 'react';

import { getMatchups } from '../fantasyService';

import Loading from '../assets/loading_circle.svg';

import { FaSortDown } from 'react-icons/fa';
import Boxscore from './Boxscore';

function Matchups(){

    function getData(year){
        setIsOpen(!isOpen);

        setLoading(true);
        
        setYear(year);
        
        getMatchups(year, 1)
        .then(responseData => {
            console.log(responseData)
            setData(responseData);
            setLoading(false);
        })
        .catch(error => {
            console.error("Failed to get matchups:", error);
        });
    }

    const [data,setData] = useState();

    const [isOpen,setIsOpen] = useState(false);

    const [isWeekOpen,setIsWeekOpen] = useState(false);

    const [loading,setLoading] = useState(false);
  
    const [year, setYear] = useState("");

    const [week, setWeek] = useState(1);

    const years = [2022,2021,2020,2019,2018,2017];


    const weeks = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]

 
    return (   
        <div className='mt-2'>
                {/* week and year buttons */}
                <div className="relative inline-flex flex-col text-left justify-center ml-2 px-2">
                <div className='flex flex-row gap-5'>
                <button onClick={() => setIsOpen(!isOpen)} className="w-full inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 whitespace-nowrap">
                    {year === "" ? "select year" : "year "+ year}

                    <FaSortDown></FaSortDown>
                </button>
                <button disabled={!data} onClick={() => setIsWeekOpen(!isWeekOpen)} className="w-full inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 whitespace-nowrap disabled:cursor-not-allowed disabled:bg-green-700/50">
                    {week === "" ? "select week" : "week "+ week}
                    <FaSortDown></FaSortDown>
                </button>
                {loading ? <img alt="loading" style={{'width':'20px'}} src={Loading}></img>:null}

            </div>
      
            {/* year items */}
            {isOpen && (
                <div  className="flex flex-col w-full rounded-md shadow-lg bg-green-50 ring-1 ring-black ring-opacity-5 z-100">
                    <div className="flex flex-col mt-1" style={{'position':'absolute','width':'40%'}} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {years.map(year => (
                        <div key={year} onClick={()=>{getData(year);}} className="px-4 py-2 text-sm text-green-700 hover:bg-green-400 hover:text-green-900 bg-green-200 text-center cursor-pointer" role="menuitem">{year}</div>
                        ))}
                    </div>
                </div>
            )}

            {/* week items */}
            {isWeekOpen && (
                <div className="flex flex-col rounded-md shadow-lg bg-green-50 ring-1 ring-black ring-opacity-5 z-100">
                    <div className="flex flex-col mt-1" style={{'position':'absolute','width':'40%','alignSelf':'end'}} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {/* dynamic as num of games changed */}
                        {data[0].year === 2017 ? weeks.slice(0,15).map(week => (
                            <div key={week} onClick={()=>{setWeek(week); setIsWeekOpen(!isWeekOpen);}} className="px-4 py-2 text-sm text-green-700 hover:bg-green-400 hover:text-green-900 bg-green-200 text-center cursor-pointer" role="menuitem">Week {week}</div>
                        )):  weeks.map(week => (
                            <div key={week}  onClick={()=>{setWeek(week); setIsWeekOpen(!isWeekOpen);}} className="px-4 py-2 text-sm text-green-700 hover:bg-green-400 hover:text-green-900 bg-green-200 text-center cursor-pointer" role="menuitem">Week {week}</div>
                        ))}  
                    </div>
                </div>
            )}
                </div>
                {/* if data available */}
                {!!data ? data.map(data =>(
                <div>
                    {data.week && data.week === week ? 
                    <div className="p-4">
                        {data.playoff_type ? 
                            <div className="text-center font-bold">Week {data.week} - {data.playoff_type}</div>
                            :
                            <div className="text-center font-bold">Week {data.week} - Matchup {data.matchupNum}</div>
                        }
                        <div className="grid grid-cols-2 gap-5 text-center bg-green-100 rounded-lg border border-green-600 px-3 text-xs text-base sm:text-lg md:text-lg lg:text-2xl">
                            {/* Team Headers & Scores */}
                            <div className="font-bold p-2 col-span-1">
                                {/* if championship and home team won show crown */}
                                {data.playoff_type === "championship" ?
                                    
                                    data.home_score > data.away_score ? 
                                        <div>{data.home_team} - 👑</div> 
                                    :   <div>{data.home_team}</div>

                                    : 
                                    <div>{data.home_team}</div>

                                }
                                {data.home_score > 0?
                                    <div className="font-light">{data.home_score}</div>                                
                                :null}
                            </div>
                            <div className="font-bold p-2 col-span-1">
                                {/* if championship and away team won show crown */}
                                {data.playoff_type === "championship" ?
                                    
                                    data.home_score < data.away_score ? 
                                        <div>{data.away_team} - 👑</div> 
                                    :   <div>{data.away_team}</div>

                                    : 
                                    <div>{data.away_team}</div>

                                }
                                {data.away_score > 0 ? 
                                    <div className="font-light">{data.away_score}</div>
                                :null} 
                            </div>
                                
                            <div id="col1" className="border-r border-green-600 pr-5">
                                {Array.isArray(data.home_team_lineup) ?
                                    <Boxscore box_score = {data.home_team_lineup}></Boxscore>
                                    : null
                                }
                            
                            </div>
                            
                            <div id="col2">
                            {Array.isArray(data.away_team_lineup) ?
                                <Boxscore box_score={data.away_team_lineup} order={'rev'}></Boxscore>
                                :
                                null
                            }
                            </div>
                         
                        </div>
                     </div>
                    : null}
                   
                </div>
                )):null}
        </div>
    );
}

export default Matchups;
