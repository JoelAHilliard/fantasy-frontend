import logo from './logo.svg';

import './App.css';

import Test from './components/Test';

import { useEffect, useState } from 'react';

import Matchups from './components/Matchups';

import Navbar from './components/Navbar';

function App() {
  const [data,setData] = useState();

  const [isOpen,setIsOpen] = useState(false);
  const [loading,setLoading] = useState(false);

  const [year, setYear] = useState("Select Year");



  



  return (

    <div>
      {/* move nav to own componet */}
      <Navbar></Navbar>
    </div>
  
  );
}

export default App;
