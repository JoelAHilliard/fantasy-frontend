import "./Phaucette.css"
import {IconContext} from 'react-icons';
import {  BsFillPatchCheckFill} from 'react-icons/bs'
function Phaucette() {
return (
    
<div className="text-sm phaucette bg-gray-200 border-b-4 border-green-400 rounded-lg">
<div className="bold text-base">
    <h1>Phaucette's Weekly Rankings</h1>
    </div>
    <IconContext.Provider value={{color:'green'}}>
        <BsFillPatchCheckFill/>

    </IconContext.Provider>
    <ol className="ranking-list text-sm ml-4">
        <li>Mad Dawg</li>
        <li>Wes</li>
        <li>Joel</li>
        <li>Hunter</li>
        <li>Jacob</li>
        <li>Eric</li>
        <li>Calvin</li>
        <li>Clog</li>
        <li>Colin</li>
        <li>Hoff</li>
        <li>Jayrod</li>
        <li>Faucette</li>
    </ol>
</div>

);
}

export default Phaucette;