import { useEffect, useState } from "react";
import { getTeams } from "../fantasyService";
import TeamBreakdown from "./TeamBreakdown";
import { FaSortDown } from 'react-icons/fa';

function Teams(){
    

    const [teams,setTeams] = useState(null);
    
    const [team,setTeam] = useState(null);
    
    const [isOpen,setIsOpen] = useState(false);

    useEffect(() => {
        function getData(){
            let teams_data = {};
            getTeams()
            .then(responseData => {
                for (const item in responseData)
                {
                    if(responseData[item]["year"] === 2023)
                    {
                        for(const team in responseData[item]["teams"])
                        {
                            teams_data[responseData[item]["teams"][team]["team_name"]] = responseData[item]["teams"][team]
                        }
                    }
                }
                setTeams(teams_data);
                let team_names = Object.keys(teams_data)
                setTeam(teams_data[team_names[1]])
            })
            .catch(error => {
                console.error("Failed to get matchups:", error);
            });
        }
        getData();
    },[]);

   

    return(
        team ? <div className="px-8 py-2">
             <div className='flex flex-row gap-5 align-center justify-between '>
                    <button onClick={() => setIsOpen(!isOpen)} className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 whitespace-nowrap">
                        {team["team_name"]}
                        <FaSortDown></FaSortDown>
                    </button>
                    {/* <h1 className="text-right font-bold text-xs text-base sm:text-xs md:text-xl lg:text-2xl">{category}</h1> */}
                </div>
            {isOpen && (
            <div  className="flex flex-col w-full rounded-md shadow-lg bg-green-50 ring-1 ring-black ring-opacity-5 z-100">
                <div className="flex flex-col mt-1" style={{'position':'absolute'}} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {teams && Object.keys(teams).map(team => (
                        <div key={team} onClick={()=>{setTeam(teams[team]); setIsOpen(!isOpen)}} className="px-4 py-2 text-sm text-green-700 hover:bg-green-400 hover:text-green-900 bg-green-200 text-center cursor-pointer" role="menuitem">{teams[team]["team_name"]}</div>
                    ))}
                </div>
            </div>
        )}
        
        <TeamBreakdown team={team}></TeamBreakdown>
        

        </div>
        :
        <p className="p-8">loading</p>
    )
}


export default Teams;