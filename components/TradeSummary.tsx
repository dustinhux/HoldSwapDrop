'use client';

import { players } from '../data/players';

interface TradeSummaryProps {
  team1: string[];
  team2: string[];
  adjustedPlayers: { [key: string]: number };
}

export default function TradeSummary({ team1, team2, adjustedPlayers }: TradeSummaryProps) {
  const getTotal = (ids: string[]) =>
    ids.reduce((sum, id) => sum + (adjustedPlayers[id] || 0), 0);

  const getPositions = (ids: string[]) => {
    return ids.map(id => {
      const player = players.find(p => p.id === id);
      return player?.position;
    }).filter(Boolean).join(', ');
  };

  const team1Total = getTotal(team1);
  const team2Total = getTotal(team2);
  const difference = Math.abs(team1Total - team2Total);
  const isFair = difference <= 200;
  const sliderColor = isFair ? 'text-blue-600' : 'text-red-600';

  const favoredTeam = team1Total > team2Total ? 'Team 1' : team2Total > team1Total ? 'Team 2' : null;
  const highlightStyle = 'font-bold underline';

  return (
    <div className="mt-8 p-4 border rounded shadow bg-white text-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="text-left">
          {team1.length > 0 && (
            <>
              <div className="flex justify-between items-center text-lg">
                <span>
                  <b>{team1.length}</b> total piece{team1.length === 1 ? '' : 's'} to <b>Team 1</b>
                </span>
                <span className={`font-bold ${sliderColor} transition-colors duration-500`}>{Math.round(team1Total)}</span>
              </div>
              <div className="text-xs text-gray-600">{getPositions(team1)}</div>
            </>
          )}
        </div>

        <div className="text-left md:text-right">
          {team2.length > 0 && (
            <>
              <div className="flex justify-between md:justify-between items-center text-lg">
                <span>
                  <b>{team2.length}</b> total piece{team2.length === 1 ? '' : 's'}  to <b>Team 2</b>
                </span>
                <span className={`font-bold ${sliderColor} transition-colors duration-500`}>{Math.round(team2Total)}</span>
              </div>
              <div className="text-xs text-gray-600">{getPositions(team2)}</div>
            </>
          )}
        </div>
      </div>

      <div className="relative w-full h-6 bg-gray-300 rounded overflow-hidden mb-2">
        <div
          className={`absolute top-0 h-full ${
            isFair ? 'bg-blue-500' : 'bg-red-500'
          } transition-all duration-500`}
          style={{
            width:
              team1Total + team2Total === 0
                ? '50%'
                : `${(team1Total / (team1Total + team2Total)) * 100}%`,
          }}
        />
      </div>

      <div className="text-sm mt-1 transition-all duration-500">
        {isFair ? (
          <span className="text-blue-600 font-bold">Fair Trade</span>
        ) : (
          <>
            <span className="text-red-600 font-bold">Favors </span>
            <span className={highlightStyle}>{favoredTeam}</span>
            <span className="text-red-600 font-bold"> by {Math.round(difference)}</span>
          </>
        )}
      </div>
    </div>
  );
}
