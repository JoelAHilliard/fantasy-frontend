import "./Phaucette.css"
import {IconContext} from 'react-icons';
import {  BsFillPatchCheckFill} from 'react-icons/bs'
function Phaucette() {

const rankings = [
  "Hunter",
  "Joel",
  "Colin",
  "Faucette",
  "Jrod",
  "Hoff",
  "Wes (eliminated)",
  "Ethan (eliminated)",
  "Steven (eliminated)",
  "Jacob (eliminated)",
  "Calvin (eliminated)",
  "Eric (eliminated)"
];



return (
    
    <div className="p-2 text-sm phaucette bg-gray-150 rounded-lg relative">
        <IconContext.Provider value={{color:'green'}} >
            <BsFillPatchCheckFill style={{'position':"absolute","top":"-9px","right":"-9px"}}/>
        </IconContext.Provider>
        
        <h2 className="text-base font-bold mb-6 text-gray-800">Phaucette's Rankings</h2>
        <div className="flex flex-row gap-1">
            <div className="flex space-x-4">
                <ul className="flex-1 space-y-2">
                {rankings.slice(0,rankings.length/2).map((person,i) =>{
                    return(
                        <li className="p-1 bg-gray-50 border-2 border-gray-200 rounded-md">
                            <span className="text-sm font-bold text-green-500 whitespace-nowrap"><span className="text-xs">{i+1}.</span> {person}</span>
                        </li>
                    )
                })}

                </ul>
            </div>
            <div className="flex space-x-4 ">
                <ul className="flex-1 space-y-2">
                {rankings.slice(rankings.length/2  ,rankings.length-1 + 1).map((person,i) =>{
                    return(
                        <li className="p-1 bg-gray-50 border-2 border-gray-200 rounded-md">
                            <span className="text-sm font-bold text-green-500 whitespace-nowrap"><span className="text-xs">{i+rankings.length/2 + 1}.</span> {person}</span>
                        </li>
                    )
                })}

                </ul>
            </div>
        </div>
    </div>
  
);
}

export default Phaucette;
