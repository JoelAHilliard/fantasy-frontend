
import {  useState } from 'react';

import { getMatchups } from '../fantasyService';

import Loading from '../assets/loading_circle.svg';

import { FaSortDown } from 'react-icons/fa';

import Boxscore from './Boxscore';

import {ACTIVE_YEARS} from '../fantasyService';

import RefImg from '../assets/ref.png';

function Matchups(){

    function getData(year){
        setIsOpen(!isOpen);

        setLoading(true);
        
        setYear(year);

        let matchups_by_week = {};
        
        getMatchups(year, 1)
        .then(responseData => {
            let weeks = [];
            for(let i =0; i<responseData.length;i++){
                if(matchups_by_week["week_"+String(responseData[i].week)] === undefined)
                {
                    matchups_by_week["week_"+String(responseData[i].week)] = [responseData[i]]
                } else {
                    matchups_by_week["week_"+String(responseData[i].week)].push(responseData[i]);
                }
                if(!weeks.includes(responseData[i].week))
                {
                    weeks.push(responseData[i].week)
                }
            }
            setMatchupsByWeek(matchups_by_week);
            
            setWeek(1);
            
            setWeeklyTags(1,matchups_by_week["week_1"]);
            
            setWeeks(weeks)
            
            setLoading(false);
        })
        .catch(error => {
            console.error("Failed to get matchups:", error);
        });
    }

    const [isOpen,setIsOpen] = useState(false);

    const [isWeekOpen,setIsWeekOpen] = useState(false);

    const [loading,setLoading] = useState(false);
  
    const [year, setYear] = useState("");

    const [week, setWeek] = useState(1);

    const [highscore, setHighScore] = useState(null);

    const [matchupsByWeek, setMatchupsByWeek] = useState(null);

    const [lowscore, setLowScore] = useState(null);

    const years = JSON.parse(ACTIVE_YEARS);

    const [weeks,setWeeks] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]);

    const positions_order = ["QB", "RB", "RB","WR","WR","TE", "FLEX", "D/ST", "K"];
 
    const setWeeklyTags = (week,data) =>{
        let low = 9999;
        let high = 0;

        for(let matchup in data)
        {
            if(data[matchup].week === week)
            {
                if(data[matchup].away_score > high)
                {
                    high = data[matchup].away_score
                }
                if(data[matchup].away_score < low)
                {
                    low = data[matchup].away_score
                }
                if(data[matchup].home_score > high)
                {
                    high = data[matchup].home_score
                }
                if(data[matchup].home_score < low)
                {
                    low = data[matchup].home_score
                }
            }
        }
        setLowScore(low);
        setHighScore(high);
    }

    return (   
            <div className='mt-2'>
                    {/* week and year buttons */}
                    <div className="relative inline-flex flex-col text-left justify-center ml-2 px-2">
                    <div className='flex flex-row gap-5'>
                    <button onClick={() => setIsOpen(!isOpen)} className="w-full inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 whitespace-nowrap">
                        {year === "" ? "select year" : "year "+ year}

                        <FaSortDown></FaSortDown>
                    </button>
                    <button disabled={!matchupsByWeek} onClick={() => setIsWeekOpen(!isWeekOpen)} className="w-full inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 whitespace-nowrap disabled:cursor-not-allowed disabled:bg-green-700/50">
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
                            {weeks.map(week => (
                                <div key={week} onClick={()=>{setWeek(week); setIsWeekOpen(!isWeekOpen); setWeeklyTags(week,matchupsByWeek["week_"+String(week)]);}} className="px-4 py-2 text-sm text-green-700 hover:bg-green-400 hover:text-green-900 bg-green-200 text-center cursor-pointer" role="menuitem">Week {week}</div>
                            ))} 
                        </div>
                    </div>
                )}
                </div>


                {/* if data available */}
               
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 px-4'>
                {matchupsByWeek &&  matchupsByWeek['week_'+String(week)] ? matchupsByWeek['week_'+String(week)].sort((a,b) => {return a.matchupNum - b.matchupNum}).map(data => 
                        <div key={data.home_team + data.matchupNum} className="">
                            {data.playoff_type ? 
                                <div className="text-center font-bold">Week {data.week} - {data.playoff_type}</div>
                                :
                                <div className="text-center font-bold">Week {data.week} - Matchup {data.matchupNum}</div>
                            }
                            <div className="py-2 gap-2 text-center  rounded-lg px-3 text-xs text-base sm:text-lg md:text-lg lg:text-base shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]" style={{display: 'grid', gridTemplateColumns: '45% 10% 45%', gap: '4px'}}>
                                {/* Team Headers & Scores */}
                                <div id="col1" className="font-bold p-1 col-span-1 truncate">
                                    {/* if championship and home team won show crown */}
                                    {data.year >= 2019 &&<img alt="logo" style={{"width":'25px',"height":"25px"}} className='mx-auto rounded-full' src={data.home_team_logo} onError={(e) => { e.target.onerror = null; e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG" }}></img>}

                                    {data.playoff_type === "championship" ?
                                        
                                        data.home_score > data.away_score ? 
                                            <div>{data.home_team} - 👑</div> 
                                        :   <div>{data.home_team}</div>

                                        : 
                                        <div>{data.home_team}</div>

                                    }
                                    {data.home_score > 0 ?
                                        <div className="font-light flex gap-1 items-center justify-center">
                                            {data.home_score}
                                            {data.home_score === lowscore && <span className='bg-red-200 rounded-full w-fit px-1 h-fit  text-xs font-thin text-red-700'>low scorer</span>}
                                            {data.home_score === highscore && <span className='bg-green-200 rounded-full w-fit h-fit px-1 text-xs font-thin text-green-700'>high scorer</span>}
                                        </div>                                
                                    :null}
                                    
                                </div>
                                <div></div>
                                
                                <div id="col2" className="font-bold p-1 col-span-1 truncate">
                                    {/* if championship and away team won show crown */}
                                    {data.year >= 2019 && <img alt="logo" style={{"width":'25px',"height":"25px"}} className='mx-auto rounded-full' src={data.away_team_logo} onError={(e) => { e.target.onerror = null; e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG" }}></img>}

                                    {data.playoff_type === "championship" ?
                                        data.home_score < data.away_score ? 
                                            <div>{data.away_team} - 👑</div> 
                                        :   <div>{data.away_team}</div>

                                        : 
                                        <div>
                                            {data.away_team}
                                        </div>

                                    }
                                    {data.away_score > 0 ?
                                        <div className="font-light flex gap-1 items-center justify-center">
                                            {data.away_score}
                                            {data.away_score === lowscore && <span className='bg-red-200 rounded-full w-fit px-1 h-fit  text-xs font-thin text-red-700'>low scorer</span>}
                                            {data.away_score === highscore && <span className='bg-green-200 rounded-full w-fit h-fit px-1 text-xs font-thin text-green-700'>high scorer</span>}
                                        </div>                                
                                    :null}
                                </div>
                                
                                <div id="col1">
                                    {Array.isArray(data.home_team_lineup) ?
                                        <Boxscore box_score = {data.home_team_lineup}></Boxscore>
                                        : null
                                    }
                                
                                </div>

                                <div>
                                    {data.year > 2018 && positions_order.map((pos,i) => {
                                        return(<div key={i} className='text-white py-1 h-[45px] underline sm:h-[49px] flex text-center w-full justify-center items-center font-bold text-[10px] sm:text-sm sm:py-1'>
                                            <span className='bg-green-700 px-1 rounded'>{pos}</span>
                                        
                                        </div>)
                                    })}
                                    {data.year < 2019 &&
                                        <div className='flex flex-col justify-center items-center h-[100%]'>
                                            <img alt="ref" src={RefImg}></img>
                                            <span className='text-base whitespace-nowrap text-center'>Rosters unavailable</span>
                                            {/* <span className='text-xs whitespace-nowrap text-center'>You can check your historical rosters on the teams tab</span> */}
                                        </div>
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
                ):null}
                </div>
                
        </div>
    );
}

export default Matchups;
