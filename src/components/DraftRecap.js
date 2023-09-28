import { useState  } from "react";
import { getDraftData } from "../fantasyService";
import { VictoryLine, VictoryChart,VictoryLegend, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip } from 'victory';

import { FaSortDown } from 'react-icons/fa';


const DraftRecap = () =>  {

    const [data,setData] = useState(null);

    const [dataNoQbs,setNoQbs] = useState(null);

    const [checked,setIsChecked] = useState(false);

    const [teams,setTeams] = useState(null);

    const [teamsFilter,setTeamsFilter] = useState(null);

    const [menu,setMenu] = useState(false);

    const [lowLine,setlowLine] = useState(null);
    const [lowLineNoQBs,setlowLineNoQBs] = useState(null);
    
    const [highLine,sethighLine] = useState(null);
    const [highLineNoQBs,sethighLineNoQBs] = useState(null);

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

    const getHighAndLowLines = (data) => {
        let draftPicks = {
            "1":[],
            "2":[],
            "3":[],
            "4":[],
            "5":[],
            "6":[],
            "7":[],
            "8":[],
            "9":[],
            "10":[],
            "11":[],
            "12":[],
            "13":[],
            "14":[],
            "15":[],
            "16":[],
        }
        let lowLine = []
        let highLine = []

        for (let pick in data)
        {
            for(let player in data[pick])
            {
                draftPicks[data[pick][Number(player)].x].push(data[pick][Number(player)])
            }
        }

        let sortedByPoints = {}
        Object.keys(draftPicks).forEach((round)=>{
            sortedByPoints[round] = draftPicks[round].sort((a,b) => b.y-a.y)
            // sortedByPoints[round][sortedByPoints[round].length-1]["showLabel"] = false;
            // sortedByPoints[round][0]["showLabel"] = false;
            lowLine.push(sortedByPoints[round][sortedByPoints[round].length-1])
            highLine.push(sortedByPoints[round][0])
        })
        return [lowLine,highLine]
    }
    
    function getData(year){
        getDraftData(year)

        .then(responseData => {
            let keys = Object.keys(responseData[0]["data"])

            setData(responseData[0]["data"]);
            
            setTeams(keys);
            
            setTeamsFilter(keys)

            let nonQbData = getNonQBs(responseData[0]["data"])
            setNoQbs(nonQbData);
            
            let res = getHighAndLowLines(responseData[0]["data"])
            setlowLine(res[0])
            sethighLine(res[1])

            let resNoQbs = getHighAndLowLines(nonQbData);
            setlowLineNoQBs(resNoQbs[0])
            sethighLineNoQBs(resNoQbs[1])
        })
        .catch(error => {
            console.error("Failed to get matchups:", error);
        });
    }

    function changeActiveTeam(team)
    {
        setTeamsFilter([team]);
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
        <div style={{"overflow":"visible"}}>
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
                        <div onClick={()=>{setTeamsFilter(teams); setMenuText("select team");}} className="bg-red-600 rounded p-1 w-fit text-white px-2 cursor-pointer">
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
                            labels={({ datum }) => {
                                if (datum.showLabel !== false) {  // Add your condition here
                                    return `${datum.player.name}\n Points Scored: ${datum.y}  \n Round Selected: ${datum.x}`;
                                }
                                return null;
                            }}
                            labelComponent={
                                <VictoryTooltip
                                    cornerRadius={0}
                                    padding={0}
                                    style={{fontSize: 5, margin:0}}
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
                            labels={"points scored"} 
                            dependentAxis 
                        />
                        {dataNoQbs && teamsFilter.map((team,index)=>{
                            return(
                            <VictoryLine
                                    key={team}
                                    data={dataNoQbs[team]}
                                    x="x"
                                    y="y"
                                    player="player"
                                    showLabel="true"

                                    style={{
                                    data: { stroke: colors[index] , strokeWidth:1.5},
                                    }}
                            />)
                        })}
                         {lowLineNoQBs &&
                        
                            <VictoryLine   
                                key={lowLineNoQBs}
                                data={lowLineNoQBs.map(point => ({ ...point, showLabel: false }))} 
                                x="x"
                                y="y"
                                player="player"
                                showLabel="false"

                                style={{
                                    data: { stroke: 'black', strokeDasharray:"5,5", strokeWidth:1},
                                }}
                                >
                            </VictoryLine>}
                        
                        {highLineNoQBs && 
                        <VictoryLine   
                            key={highLineNoQBs}
                            data={highLineNoQBs.map(point => ({ ...point, showLabel: false }))} 
                            x="x"
                            y="y"
                            showLabel="false"
                            player="player"
                            style={{
                                data: { stroke: 'black', strokeDasharray:"5,5", strokeWidth:1},
                            }}
                            
                            >
                        </VictoryLine>}
                    </VictoryChart>
                    <VictoryLegend 
                            title={"Teams"}
                            centerTitle
                            x={10} 
                            y={0}  // Adjust this value as needed to position the legend below the chart
                            orientation="horizontal"
                            gutter={20}
                            itemsPerRow={2}
                            symbolSpacer={6}
                            style={{
                                margin:"auto", 
                                title: { fontSize: 10 }, 
                                labels: { fontSize: 14 },  // Adjust the font size here
                                data: { strokeWidth: 0.5 } // Adjust the stroke width here
                            }}
                            data={teams.map((team)=>
                                {
                                    return({"name":team,"symbol":{"fill":colors[teams.indexOf(team)],"width":8,"height":8}})
                                }
                            )
                        }
                        />
                </div>
            }
            {!checked && data &&
                <div className="px-4 mx-auto" style={{"overflow":"visible"}}> 
                        <VictoryChart  
                            width={500}
                            standalone={true}
                            containerComponent = {
                                <VictoryVoronoiContainer
                                    labels={({ datum }) => {
                                        if (datum.showLabel !== false) {  // Add your condition here
                                            return `${datum.player.name}\n Points Scored: ${datum.y}  \n Round Selected: ${datum.x}`;
                                        }
                                        return null;
                                        }}
                                    labelComponent={
                                        <VictoryTooltip
                                            cornerRadius={0}
                                            padding={0}
                                            style={{fontSize: 5, margin:0}}
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
                            labels={"points scored"} 
                            dependentAxis 
                        />
                        {teamsFilter && teamsFilter.map((team,index)=>{
                            return(
                                <VictoryLine
                                    key={team}
                                    data={data[team]}
                                    x="x"
                                    y="y"
                                    player="player"
                                    showLabel="true"
                                    style={{
                                    data: { stroke: colors[index], strokeWidth:1.5 },
                                    }}
                            />)
                        })}
                        {lowLine &&
                        
                        <VictoryLine   
                            key={lowLine}
                            data={lowLine.map(point => ({ ...point, showLabel: false }))} 
                            player="player"

                            style={{
                                data: { stroke: 'black', strokeDasharray:"5,5", strokeWidth:1},
                            }}

                            >
                        </VictoryLine>}
                        
                            {highLine && <VictoryLine   
                                key={highLine}
                                data={highLine.map(point => ({ ...point, showLabel: false }))} 
                                player="player"
                                style={{
                                    data: { stroke: 'black', strokeDasharray:"5,5", strokeWidth:1},
                                }}
                                >
                        </VictoryLine>}
                    </VictoryChart>
                    <VictoryLegend 
                    title={"Teams"}
                    centerTitle
                        x={10} 
                        y={0}  // Adjust this value as needed to position the legend below the chart
                        orientation="horizontal"
                        gutter={20}
                        itemsPerRow={2}
                        symbolSpacer={6}
                        style={{
                            margin:"auto", 
                            title: { fontSize: 10 }, 
                            labels: { fontSize: 14 },  // Adjust the font size here
                            data: { strokeWidth: 0.5 } // Adjust the stroke width here
                        }}
                        data={teams.map((team)=>
                            {
                                return({"name":team,"symbol":{"fill":colors[teams.indexOf(team)],"width":8,"height":8}})
                            }
                        )
                        }
                        />
            </div>
            }   
        </div>
    );
}
export default DraftRecap;