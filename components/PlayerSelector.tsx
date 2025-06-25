'use client';

import { players } from '../data/players';

interface PlayerSelectorProps {
  team: string[];
  setTeam: (ids: string[]) => void;
  title: string;
}

export default function PlayerSelector({ team, setTeam, title }: PlayerSelectorProps) {
  const togglePlayer = (id: string) => {
    const updated = team.includes(id) ? team.filter(p => p !== id) : [...team, id];
    setTeam(updated);
  };

  return (
    <div>
      <h2 className="font-semibold mb-2">{title}</h2>
      <ul className="space-y-1">
        {players.map(player => (
          <li key={player.id}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={team.includes(player.id)}
                onChange={() => togglePlayer(player.id)}
              />
              <span>{player.name} (${player.value})</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
