import "./Phaucette.css"
import {IconContext} from 'react-icons';
import {  BsFillPatchCheckFill} from 'react-icons/bs'
function Phaucette() {

return (
    
    <div className="p-2 text-sm phaucette bg-gray-200 border-b-4 border-green-400 rounded-lg relative">
        <IconContext.Provider value={{color:'green'}} >
            <BsFillPatchCheckFill style={{'position':"absolute","top":"-9px","right":"-9px"}}/>
        </IconContext.Provider>
        <div className="bold text-base">
            <h1>Phaucette's Weekly Rankings</h1>
        </div>
    
        <ol className="ranking-list text-sm ml-4" >
        
            <li>Wes</li>
            <li>Joel</li>
            <li>Hunter</li>
            <li>Mad Dawg</li>
            <li>Jacob</li>
            <li>Colin</li>
            <li>Eric</li>
            <li>Steven</li>
            <li>Calvin</li>
            <li>Jayrod</li>
            <li>Faucette</li>
            <li>Hoff</li>
        </ol>
    </div>
  
);
}

export default Phaucette;