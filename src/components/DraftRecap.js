import { useState ,useEffect } from "react";
import { getDraftData } from "../fantasyService";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip } from 'victory';

import { FaSortDown } from 'react-icons/fa';


const DraftRecap = () =>  {

    const [data,setData] = useState(null);

    const [dataNoQbs,setNoQbs] = useState(null);

    const [checked,setIsChecked] = useState(false);

    const [teams,setTeams] = useState(null);

    const [teamsDom,setTeamsDom] = useState(null);

    const [menu,setMenu] = useState(false);

    const [yearMenu,setYearMenu] = useState(false);

    const [menuText,setMenuText] = useState("select team");

    const [yearMenuText,setYearMenuText] = useState("select year");

    const years = [2017,2018,2019,2020,2021,2022];
    
    const colors = [
        "#FF5733", // Bright red
        "#33FF57", // Bright green
        "#5733FF", // Bright blue
        "#FF33D1", // Bright pink
        "#FF8B33", // Orange
        "#8BFF33", // Lime green
        "#338BFF", // Sky blue
        "#D133FF", // Purple
        "#33D1FF", // Cyan
        "#D1FF33", // Yellowish green
        "#FF5733", // Bright red (You might want to replace this and others below with different shades or entirely different colors)
        "#B233FF", // Darker purple
        "#FFB233", // Yellowish orange
        "#33FFB2", // Greenish cyan
        "#B2FF33", // Another shade of green
        "#33B2FF"  // Another shade of blue
    ];
    const getNonQBs = (data) => {
        let tempData = {};
        
        Object.keys(data).forEach(team => {
            tempData[team] = data[team].filter(player => player.player.position !== 'QB');
        });
        
        return tempData;
    };
    function getData(year){
        getDraftData(year)

        .then(responseData => {
            setData(responseData[0]["data"]);
            let keys = Object.keys(responseData[0]["data"])
            setTeams(keys);
            setTeamsDom(keys);
            setNoQbs(getNonQBs(data));
        })
        .catch(error => {
            console.error("Failed to get matchups:", error);
        });
    }

    function changeActiveTeam(team)
    {
        setTeamsDom([team]);
        setMenu(false);
        setMenuText(team);
    }
    function changeActiveYear(year)
    {
        getData(year);
        setYearMenu(false);
        setYearMenuText(year);
    }


    return(
        <div className="">
            <div className="flex flex-row justify-between mt-2 px-4">
                <div className="flex flex-col gap-2 md:flex-row w-full">
                    <div id="menus" className="flex flex-row gap-1">
                        <div className="w-fit z-10">
                            <button className="w-fit inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 whitespace-nowrap cursor-pointer" 
                            onClick={()=>setYearMenu(!yearMenu)}>
                                {yearMenuText} <FaSortDown/>
                            </button>
                            <div className="fixed z-10">
                            { yearMenu && years.map((year)=>{
                                return(
                                    <div key={year} style={{'width':"75px"}} className="cursor-pointer z-10 text-center bg-green-200 w-full text-green-700 hover:bg-green-400 py-2 px-1" onClick={()=> changeActiveYear(year)}>{year}</div>
                                )
                            })}
                            </div>
                        </div>
                        <div className="w-fit z-10">
                            <button disabled={!data} className="disabled:bg-green-200 disabled:cursor-not-allowed w-fit inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 whitespace-nowrap cursor-pointer" onClick={()=>setMenu(!menu)}>
                                {menuText} <FaSortDown/>
                            </button>
                            <div className="fixed z-10">
                            {teams && menu && teams.map((team)=>{
                                return(
                                    <div key={team} className="cursor-pointer z-10 bg-green-200 w-full text-green-700 hover:bg-green-400 py-2 px-1" onClick={()=> changeActiveTeam(team)}>{team}</div>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-1 justify-between">
                        <div onClick={()=>{setTeamsDom(teams); setMenuText("select team")}} className="bg-red-600 rounded p-1 w-fit text-white px-2 cursor-pointer">
                            reset
                        </div>
                        <div className="flex items-center space-x-2 px-4 mt-2">
                            <input 
                            checked={checked}
                            onChange={e => setIsChecked(e.target.checked)}
                            type="checkbox" id="exclude-qbs" className="form-checkbox h-5 w-5 text-green-500" />
                            <label id="exclude-qbs" className="text-gray-700 cursor-pointer">Exclude QBs</label>
                        </div>
                    </div>
                </div>
            </div>

            {checked && data &&
                <div className="px-4 mx-auto"> 
                    <VictoryChart                      
                        width={500}
                        standalone={true}
                        containerComponent = {
                            <VictoryVoronoiContainer
                            labels={({ datum }) => `${datum.player.name}\n Points Scored: ${datum.y}  \n Round Selected ${datum.x}`}
                            labelComponent={
                                <VictoryTooltip
                                    cornerRadius={0}
                                    padding={0}
                                />
                            }
                        
                            />
                        }>
                        <VictoryAxis lsabel={"round drafted"}/>
                        <VictoryAxis 
                        
                            style={{
                                axis:{
                                    stroke:"transparent"
                                },
                                stroke:"clear",
                                axisLabel: { padding: 40 }  // Increase or adjust the padding as needed
                            }}
                            label={"points scored"} 
                            dependentAxis 
                        />
                        {teamsDom && teamsDom.map((team,index)=>{
                            return(
                                <VictoryLine
                                    key={team}
                                    data={dataNoQbs[team]}
                                    x="x"
                                    y="y"
                                    player="player"
                                    style={{
                                    data: { stroke: colors[index] },
                                    }}
                            />)
                        })}
                    </VictoryChart>
                </div>
            }
            {!checked && data &&
                <div className="px-4 mx-auto"> 
                    <VictoryChart                      
                        width={500}
                        standalone={true}
                        containerComponent = {
                            <VictoryVoronoiContainer
                            labels={({ datum }) => `Points Scored: ${datum.y} \n${datum.player.name} \n Round Selected ${datum.x}`}
                            labelComponent={
                                <VictoryTooltip
                                    cornerRadius={0}
                                />
                            }
                        
                            />
                        }>
                        <VictoryAxis lsabel={"round drafted"}/>
                        <VictoryAxis 
                        
                            style={{
                                axis:{
                                    stroke:"transparent"
                                },
                                stroke:"clear",
                                axisLabel: { padding: 40 }  // Increase or adjust the padding as needed
                            }}
                            label={"points scored"} 
                            dependentAxis 
                        />
                        {teamsDom && teamsDom.map((team,index)=>{
                            return(
                                <VictoryLine
                                    key={team}
                                    data={data[team]}
                                    x="x"
                                    y="y"
                                    player="player"
                                    style={{
                                    data: { stroke: colors[index] },
                                    }}
                            />)
                        })}
                    </VictoryChart>
                </div>
            }
            
            
        </div>
    );
}
export default DraftRecap;