import React from 'react';

function TeamMiniMatchup({matchup, curr_team_id}) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg my-4 mx-auto max-w-md">
            <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-bold flex justify-between w-full">
                    <div>
                     <span className='flex items-center gap-2 text-base'>{matchup.year}, Week {matchup.week}</span>
                     <div className='flex gap-1'>
                        {matchup['matchup_type'] === "WINNERS_BRACKET" ? <span className='text-xs w-fit bg-orange-200 rounded-full px-2 text-orange-400'>playoffs</span> : null}
                        {Math.abs(matchup['away_score'] - matchup['home_score']) < 7.5 ? <span className='text-xs w-fit bg-emerald-200 rounded-full px-2 text-emerald-400'>close game</span> : null}
                     </div>
                    </div>
                    

                     {matchup['away_team_id'] === curr_team_id ?
                        matchup['away_score'] > matchup['home_score'] ? <span className='text-green-500 w-fit bg-green-200 rounded-full px-2 h-fit'>W</span> :<span className='text-red-500 w-fit bg-red-200 rounded-full px-2 h-fit'>L</span>
                        :
                        matchup['away_score'] < matchup['home_score'] ? <span className='text-green-500 w-fit bg-green-200 rounded-full px-2 h-fit'>W</span> :<span className='text-red-500 w-fit bg-red-200 rounded-full px-2 h-fit'>L</span>
                        }
                </div>
            </div>
            <div className="flex justify-between items-center">
                <TeamInfo isRight={true} team={matchup.home_team} score={matchup.home_score} isCurrent={curr_team_id === matchup.home_team_id} />
                <span className="text-xs font-bold text-gray-400">VS</span>
                <TeamInfo isRight={false} team={matchup.away_team} score={matchup.away_score} isCurrent={curr_team_id === matchup.away_team_id} />
            </div>
        </div>
    );
}

function TeamInfo({isRight, team, score, isCurrent }) {
    console.log(team)
    return (
        <div className={`flex items-center ${isCurrent ? 'text-green-500' : 'text-gray-500'}`}>
            <div>
                <div className={isRight ? "font-bold text-sm text-left" : "font-bold text-sm text-right"}>{team}</div>
                <div className={isRight ? "text-left" : "text-right"}>{score.toFixed(2}</div>
            </div>
        </div>
    );
}

export default TeamMiniMatchup;
