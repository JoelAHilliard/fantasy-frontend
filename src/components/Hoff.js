import { BsFillPatchCheckFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import "./Hoff.css"
function Hoff() {
return (
    
<div className="p-2 text-sm hoff bg-gray-200 border-b-4 border-green-400 rounded-lg relative">
    <IconContext.Provider value={{color:'green'}} >
            <BsFillPatchCheckFill style={{'position':"absolute","top":"-9px","right":"-9px"}}/>
    </IconContext.Provider>
    <div className="bold text-base">
        <h1>Hoff's Matchups of the Week</h1>
    </div>
    <ol className="ranking-list-hoff text-sm">
        <li>1. Hoff vs. Jacob</li>
        <li>2. calvin vs. Phaucette</li>
        <li>3. Wes vs. Mad Dawg</li>
        <li>4. Colin vs. Hunter</li>
        <li>5. Joel vs. Ewic</li>
        <li>6. Clog vs. Jay-rod</li>
    </ol>
</div>

);
}

export default Hoff;