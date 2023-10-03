import { useEffect, useState } from "react";
import { getTeams } from "../fantasyService";
import TeamBreakdown from "./TeamBreakdown";

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
        team ? 
        <div className="py-2">
             
            <div className="flex flex-row w-full rounded-md bg-green-50 ring-black ring-opacity-5 w-full">
                <div className="flex flex-row mt-1 gap-2 overflow-y-scroll"  role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {teams && Object.keys(teams).map(team => (
                        <div style={{"minWidth":"120px"}} key={team} onClick={()=>{setTeam(teams[team]); setIsOpen(!isOpen)}} className="px-4 py-2 text-sm text-green-700 hover:bg-green-400 hover:text-green-900 bg-white border border-green-600 text-center cursor-pointer whitespace-nowrap rounded-full min-w-40 overflow-x-hidden" role="menuitem">
                            <img
                            alt="pfp"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG" }}
                            style={{'height':'20px', 'width':'20px'}} className="rounded-full" src={teams[team]["logo_url"]}/>
                            {teams[team]["team_name"]}
                        </div>
                    ))}
                </div>
            </div>
        
            <TeamBreakdown team={team}></TeamBreakdown>
        
        </div>
        :
        <p className="p-8">loading</p>
    )
}


export default Teams;