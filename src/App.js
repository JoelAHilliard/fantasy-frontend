import logo from './logo.svg';

import './App.css';

import Test from './components/Test';


function App() {

    getMatchups(2019, 1).then(data => {
      console.log(data);
  }).catch(error => {
      console.error("Failed to get matchups:", error);
  });


  return (

    <div>
      <p>Hello World</p>

      <Test></Test>
    </div>
  
  );
}

export default App;
