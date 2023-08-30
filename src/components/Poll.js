import React, { useState } from 'react';
import './Poll.css'

function Poll() {
  const [team1Votes, setTeam1Votes] = useState(0);
  const [team2Votes, setTeam2Votes] = useState(0);

  const totalVotes = team1Votes + team2Votes;
  const team1Percentage = ((team1Votes / totalVotes) * 100).toFixed(2);
  const team2Percentage = ((team2Votes / totalVotes) * 100).toFixed(2);

  const handleVote = (team) => {
    if (team === 'team1') {
      setTeam1Votes(team1Votes + 1);
    } else if (team === 'team2') {
      setTeam2Votes(team2Votes + 1);
    }
  };

  return (
    <div className="App">
      <h1>Who will win?</h1>
      <div className="teams">
        <button onClick={() => handleVote('team1')}>Team Phaucette</button>
        <button onClick={() => handleVote('team2')}>First Round</button>
      </div>
      <div className="results">
        <p>Team Phaucette: {team1Percentage}%</p>
        <p>Team First Round: {team2Percentage}%</p>
      </div>
    </div>
  );
}

export default Poll;