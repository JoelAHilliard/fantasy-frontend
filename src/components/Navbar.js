import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React from 'react';
import Matchups from './Matchups';
import LandingPage from './LandingPage';
import Leaderboard from './Leaderboard';
import { useState } from 'react';
function Navbar(){
    const [menu, setMenu] = useState(false);
    return(
        <Router>
             <nav className="bg-green-600 p-4 text-white">
            <div className="container mx-auto">
                <div className="flex items-center justify-between flex-wrap text-m">
                    <div className="flex items-center justify-between flex-1">
                        <Link to="/" className="text-xl font-bold">
                            <h1>LTS Stats</h1>
                            <span className='text-xs text-center'>beta</span>
                        </Link>

                        {/* Hamburger Menu Icon for mobile */}
                        <button onClick={() => setMenu(!menu)} className="md:hidden px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
                            🍔
                        </button>
                    </div>

                    {/* Link items */}
                    <div className={`${menu ? 'flex flex-col' : 'hidden'} w-full md:w-auto md:flex md:items-center md:space-x-2 mt-2 md:mt-0`}>
                        <Link onClick={()=>setMenu(!menu)} to="/matchups" className="block hover:bg-green-700 px-2 py-1 rounded transform active:scale-95 font-bold whitespace-nowrap">Historical Matchups</Link>
                        <Link onClick={()=>setMenu(!menu)} to="/leaderboard" className="block md:mt-0 hover:bg-green-700 px-2 py-1 rounded transform active:scale-95 font-bold">Leaderboard</Link>
                    </div>
                </div>
            </div>
        </nav>

            <Routes>
                <Route path="/" exact element={<LandingPage/>} />
                <Route path="/matchups" exact element={<Matchups/>} />
                <Route path="/leaderboard" exact element={<Leaderboard></Leaderboard>} />
            </Routes>
        </Router>
    );

}

export default Navbar;