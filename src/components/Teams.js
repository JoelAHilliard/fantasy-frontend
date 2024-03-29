import { useEffect, useState } from "react";

import { getTeams } from "../fantasyService";

import TeamBreakdown from "./TeamBreakdown";
import RefImg from "../assets/ref.png";

import { useParams, useNavigate } from 'react-router-dom';

function Teams(){

    const { teamId } = useParams();

    const navigate = useNavigate();

    const [teams,setTeams] = useState(null);
    
    const [team,setTeam] = useState(null);
    
    const [isOpen,setIsOpen] = useState(false);

    useEffect(() => {
        function getData(){
            getTeams()
            .then(responseData => {
                setTeams(responseData);

                if(teamId){
                    for(const team in responseData){
                        if(responseData[team].team_id === Number(teamId)){
                            setTeam(responseData[team])
                        }
                    }
                }
            })
            .catch(error => {
                console.error("Failed to get matchups:", error);
            });
        }
        getData();
    },[teamId]);

   

    return(
        teams ? 
        <div className="">
             
            <div className="flex flex-row w-full rounded-md bg-green-50 ring-black ring-opacity-5 w-full">
            <style jsx="true">
                {`
                .no-scrollbar::-webkit-scrollbar {
                display: none;
                }
                .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
                }
                `}
                </style>
                <div className="flex flex-row gap-2 overflow-y-scroll no-scrollbar border relative"  role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
               
                <div className="absolute top-0 bottom-0 left-0 pointer-events-none z-10">
                    <div className="h-full w-8 bg-gradient-to-r from-white to-transparent"></div>
                </div>

                <div className="absolute top-0 bottom-0 right-0 pointer-events-none z-10">
                    <div className="h-full w-6 bg-gradient-to-r from-transparent to-white"></div>
                </div>
                <div className="ml-3 flex flex-row py-1 gap-2 overflow-y-scroll no-scrollbar">
                    {teams && Object.keys(teams).map(team => (
                        <div style={{"minWidth":"120px"}} key={team} onClick={()=>{setTeam(teams[team]); setIsOpen(!isOpen); navigate(`/teams/${teams[team].team_id}`);}} className="px-4 py-2 text-sm text-green-700 hover:bg-green-400 hover:text-green-900 bg-white border border-green-600 text-center cursor-pointer whitespace-nowrap rounded min-w-40 overflow-x-hidden" role="menuitem">
                            <img
                            alt="pfp"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://www.gravatar.com/avatar/487f7b22f68312d2c1bbc93b1aea445b?s=50&d=identicon&r=PG" }}
                            style={{'height':'20px', 'width':'20px'}} className="rounded-full mx-auto" src={teams[team]["logo_url"]}/>
                            <span className="text-center text-xs truncate">{teams[team]["team_name"]}</span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            {team?
                <TeamBreakdown team={team} teams={teams}></TeamBreakdown>
            : 
                <div className="flex flex-col justify-center items-center">   
                    <p className="font-bold underline">Select a team above</p>
                    <img alt="select a team above" className="w-[45%] sm:w-[25%] sm:h-[25%]" src={RefImg}></img>
                </div>
                }
        
        </div>
        :
        <p className="p-8">loading</p>
    )
}


export default Teams;
