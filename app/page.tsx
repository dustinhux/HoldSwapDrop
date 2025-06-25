'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [teamOnePlayers, setTeamOnePlayers] = useState<string[]>([]);
  const [teamTwoPlayers, setTeamTwoPlayers] = useState<string[]>([]);
  const [superflex, setSuperflex] = useState(false);

  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">NFL Dynasty Trade Calculator</h1>

      <div className="flex justify-center mb-4">
        <label htmlFor="superflexToggle" className="font-semibold text-sm mr-2">Superflex</label>
        <button
          id="superflexToggle"
          onClick={() => setSuperflex(!superflex)}
          className={`w-16 h-8 flex items-center rounded-full px-1 transition-colors duration-300 ${superflex ? 'bg-blue-500' : 'bg-red-500'}`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${superflex ? 'translate-x-8' : 'translate-x-0'}`}
          />
        </button>
        <span className="ml-2 text-sm font-medium">{superflex ? 'On' : 'Off'}</span>
      </div>

      <div className="text-center">
        <p>Placeholder for trade calculator content.</p>
      </div>
    </div>
  );
}
