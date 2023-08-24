import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React from 'react';
import Matchups from './Matchups';
import LandingPage from './LandingPage';
import Leaderboard from './Leaderboard';

function Navbar(){
    return(
        <Router>
            <nav className="bg-green-600 p-4 text-white">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between text-m">
                        <div>
                            <Link to="/" className="text-xl font-bold">LTS Stats</Link>
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/matchups" className="hover:bg-green-700 px-3 py-2 rounded transform active:scale-95 font-bold whitespace-nowrap">Historical Matchups</Link>
                            <Link to="/leaderboard" className="hover:bg-green-700 px-3 py-2 rounded transform active:scale-95 font-bold">Leaderboard</Link>
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