import { BsFillPatchCheckFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import "./Hoff.css"
function Cocawewa() {

    const matchup_rankings = [
        "Team Mathis vs. Team hardly",
        "WYMWM vs. maar maar binks",
        "gmmdh vs. love ertz",
        "bass to muth vs cha cha cheetah",
        "savage saloon vs. the winds of shit",
        "CDAHSM vs. yippie kiyay mother tucker",
    ]

return (
    
<div className="p-2 text-sm hoff  rounded-lg relative overflow-visible">
    <IconContext.Provider value={{color:'green'}} >
            <BsFillPatchCheckFill style={{'position':"absolute", "top":"-9px", "right":"-9px", 'zIndex': 1000}}/>
    </IconContext.Provider>

    <h2 className="text-base font-bold mb-6 text-gray-800">Ewic's Rankings</h2>
        <div className="flex space-x-4">
            <ul className="flex-1 space-y-2">
            {matchup_rankings.map((person,i) =>{
                return(
                    <li className="p-1 bg-gray-50 border-2 border-gray-200 rounded-md">
                        <span className="text-sm font-bold text-green-500 whitespace-nowrap"><span className="text-xs">{i+1}.</span> {person}</span>
                    </li>
                )
            })}

            </ul>
        </div>
</div>

);
}

export default Cocawewa;