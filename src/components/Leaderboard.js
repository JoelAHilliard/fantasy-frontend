import { useState } from "react";
import { getLeaderboard } from "../fantasyService";
import { FaSortDown } from 'react-icons/fa';

import Loading from '../assets/loading_circle.svg'
function Leaderboard(){

    const [data,setData] = useState();

    const [isOpen,setIsOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [category,setCategory] = useState("select category");

    //,"playoff_wins","playoff_losses","championship_appearances","playoff_appearances","championship_wins"
    const categories = ["wins","losses","trades","drops","avg_points_per_year","acquisitions","points_against_alltime","points_for_alltime","playoff_wins","playoff_losses","championship_wins","championship_losses"]

    function getData(category){
        if(data){
            return changeCategory(category)
        }

        setCategory(category);

        setIsOpen(!isOpen);

        setLoading(true);
        
        getLeaderboard()

        .then(responseData => {
            console.log(responseData)
            for (const key in responseData[0]) {
                if(key !== "_id"){
                    responseData[0][key]['avg_points_per_year'] = responseData[0][key]['points_for_alltime']/responseData[0][key]['years_played']
                }
            }


            setData(responseData[0]);
            console.log(responseData)
            setLoading(false);
        })
        .catch(error => {
            console.error("Failed to get matchups:", error);
        });
    }

    

    function changeCategory(category){
        setIsOpen(!isOpen);
        setCategory(category);
    }

    

    return(
        <div style={{'flexGrow':'1'}} className="dark:bg-slate-800">
            <div className="relative inline-flex flex-col text-left justify-center px-4 mt-2 mb-4 w-full ">
                <div className='flex flex-row gap-5 align-center justify-between '>
                    <button onClick={() => setIsOpen(!isOpen)} className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 whitespace-nowrap">
                        {category}
                        <FaSortDown></FaSortDown>
                    </button>
                    {/* <h1 className="text-right font-bold text-xs text-base sm:text-xs md:text-xl lg:text-2xl">{category}</h1> */}
                </div>
            {/* year items */}
            {isOpen && (
                <div  className="flex flex-col w-full rounded-md shadow-lg bg-green-50 ring-1 ring-black ring-opacity-5 z-100">
                    <div className="flex flex-col mt-1" style={{'position':'absolute'}} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {categories.map(categ => (
                        <div key={categ} onClick={()=>{getData(categ);}} className="px-4 py-2 text-sm text-green-700 hover:bg-green-400 hover:text-green-900 bg-green-200 text-center cursor-pointer" role="menuitem">{categ}</div>
                        ))}
                    </div>
                </div>
            )}
            </div>
            {data && !loading ? 
                Object.entries(data)
                .filter(([key, _]) => key !== "_id")
                .sort(([, playerA], [, playerB]) => {

                    const aValue = isNaN(Number(playerA[category])) ? playerA[category] : Number(playerA[category]);
                    
                    const bValue = isNaN(Number(playerB[category])) ? playerB[category] : Number(playerB[category]);

                    return bValue - aValue;
                })
                .map(([key, player],index) => {

                    const isNumber = !isNaN(Number(player[category]));
                    
                    return (
                        (key !== '_id' && key !== 'None' && player[category] !== undefined) ?
                        <div key={key} className="flex items-center p-2 bg-gray-200 border-b-4 border-green-600 rounded-lg shadow-lg gap-2 mb-2">
                            <div className="flex items-center gap-2">
                                <p className="text-lg sm:text-lg lg:text-xl">{index + 1}.</p>
                                <img
                                    className="w-10 h-10 rounded-full"
                                    alt="Team Logo"
                                    src={player['logo_url'] || "https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG"}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG";
                                    }}
                                />
                                <div className="flex flex-col text-left">
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl">{player['team_name']}</p>
                                    <span className="text-xs text-gray-600 underline bg-green-200 w-fit rounded-full px-1">years played: {player['years_played']}</span>
                                </div>
                            </div>
                        
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl self-center ml-auto mr-1 font-bold sm:mr-5">
                                {isNumber && ["points_for_alltime", "points_against_alltime", "avg_points_per_year"].includes(category) 
                                    ? player[category].toFixed(2) 
                                    : player[category]
                                }
                            </p>
                        </div>
                    
                            :
                            null
                        );
                    }) 
                    : null}

            {loading ? <img alt="loading" className="ml-4" style={{'width':'50px'}} src={Loading}></img>:null}
        </div>
        
    );
}

export default Leaderboard;