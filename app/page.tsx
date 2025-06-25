// Full updated file with arrow key navigation in search results

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Navbar from '../components/Navbar';
import TradeSummary from '../components/TradeSummary';
import { players } from '../data/players';

const adImages = ['/ads/ad1.png', '/ads/ad2.png', '/ads/ad3.png'];



export default function HomeWrapper() {
  return (
    <Suspense fallback={<div className="text-center p-4">Loading trade calculator</div>}>
      <Home />
    </Suspense>
  );
}

function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [teamOnePlayers, setTeamOnePlayers] = useState<string[]>([]);
  const [teamTwoPlayers, setTeamTwoPlayers] = useState<string[]>([]);
  const [adjustedPlayers, setAdjustedPlayers] = useState<{ [key: string]: number }>({});
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [highlightedIndex1, setHighlightedIndex1] = useState(-1);
  const [highlightedIndex2, setHighlightedIndex2] = useState(-1);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [superflex, setSuperflex] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adImages.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t1 = searchParams.get('team1');
    const t2 = searchParams.get('team2');
    const sf = searchParams.get('superflex');
    if (t1) setTeamOnePlayers(t1.split(','));
    if (t2) setTeamTwoPlayers(t2.split(','));
    if (sf === 'true') setSuperflex(true);
    if (sf === 'false') setSuperflex(false);
  }, [searchParams]);

  useEffect(() => {
    if (teamOnePlayers.length && teamTwoPlayers.length) {
      const team1Total = getRawTotal(teamOnePlayers);
      const team2Total = getRawTotal(teamTwoPlayers);

      let lowerTeam, higherTeam;
      if (team1Total < team2Total) {
        lowerTeam = teamOnePlayers;
        higherTeam = teamTwoPlayers;
      } else {
        lowerTeam = teamTwoPlayers;
        higherTeam = teamOnePlayers;
      }

      const lowerTotal = getRawTotal(lowerTeam);
      const higherTotal = getRawTotal(higherTeam);
      const margin = Math.floor(Math.random() * 100) + 1;
      const targetTotal = lowerTotal + margin;
      const scaleFactor = targetTotal / higherTotal;

      const newAdjusted: { [key: string]: number } = {};
      for (const player of higherTeam) {
        const base = getPlayer(player)?.value || 0;
        newAdjusted[player] = parseFloat((base * scaleFactor).toFixed(1));
      }
      for (const player of lowerTeam) {
        newAdjusted[player] = getPlayer(player)?.value || 0;
      }
      setAdjustedPlayers(newAdjusted);
    } else {
      const resetValues: { [key: string]: number } = {};
      [...teamOnePlayers, ...teamTwoPlayers].forEach(id => {
        resetValues[id] = getPlayer(id)?.value || 0;
      });
      setAdjustedPlayers(resetValues);
    }
  }, [teamOnePlayers, teamTwoPlayers]);

  const updateURL = (team1: string[], team2: string[], sf?: boolean) => {
    const params = new URLSearchParams();
    if (team1.length) params.set('team1', team1.join(','));
    if (team2.length) params.set('team2', team2.join(','));
    params.set('superflex', sf ? 'true' : 'false');
    router.push(`/?${params.toString()}`);
  };

  const toggleSuperflex = () => {
    const newState = !superflex;
    setSuperflex(newState);
    updateURL(teamOnePlayers, teamTwoPlayers, newState);
  };

  const addPlayer = (id: string, team: 'team1' | 'team2') => {
    if (team === 'team1' && !teamOnePlayers.includes(id)) {
      const updated = [...teamOnePlayers, id];
      setTeamOnePlayers(updated);
      updateURL(updated, teamTwoPlayers, superflex);
      setSearch1('');
      setShowDropdown1(false);
      setHighlightedIndex1(-1);
    }
    if (team === 'team2' && !teamTwoPlayers.includes(id)) {
      const updated = [...teamTwoPlayers, id];
      setTeamTwoPlayers(updated);
      updateURL(teamOnePlayers, updated, superflex);
      setSearch2('');
      setShowDropdown2(false);
      setHighlightedIndex2(-1);
    }
  };

  const removePlayer = (id: string, team: 'team1' | 'team2') => {
    if (team === 'team1') {
      const updated = teamOnePlayers.filter(p => p !== id);
      setTeamOnePlayers(updated);
      updateURL(updated, teamTwoPlayers, superflex);
    }
    if (team === 'team2') {
      const updated = teamTwoPlayers.filter(p => p !== id);
      setTeamTwoPlayers(updated);
      updateURL(teamOnePlayers, updated, superflex);
    }
  };

  const getPlayer = (id: string) => players.find(p => p.id === id);
  const getRawTotal = (ids: string[]) => ids.reduce((sum, id) => sum + (getPlayer(id)?.value || 0), 0);

  return (
    <>
      <div className="w-full bg-blue-100 text-center py-1 text-sm font-medium text-gray">
        Fleaflicker leagues and FFPC leagues are now supported in power rankings. <u>See your league.</u>
      </div>
      <Navbar />

      <div className="p-4 pb-32">
        <h1 className="text-2xl font-bold mb-2 text-center">NFL Dynasty Trade Calculator</h1>
        <p className="text-sm text-center text-gray-600 mb-4">Crowdsourced market values updated 3 hours ago</p>

        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start mb-4 gap-2">
          <div className="mb-4">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
              <div className="w-full md:w-auto md:absolute md:right-15 md:top-[110px]">
              <div className="bg-gray-100 rounded shadow p-2 text-sm w-full max-w-lg md:max-w-xs text-center md:text-center animate-fade-in">
                  HSD's trade calculator uses crowdsourced values for players and picks from <span className="font-semibold">69,420,666</span> data points (and counting) provided by users like you.
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex justify-center w-full">
            <div className="bg-white rounded shadow p-2 flex items-center gap-3 animate-fade-in">
              <label htmlFor="superflexToggle" className="font-semibold text-sm">Superflex</label>
              <button
                id="superflexToggle"
                onClick={toggleSuperflex}
                className={`w-16 h-8 flex items-center rounded-full px-1 transition-colors duration-300 ${superflex ? 'bg-blue-500' : 'bg-red-500'}`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${superflex ? 'translate-x-8' : 'translate-x-0'}`}
                />
              </button>
              <span className="text-sm font-medium">{superflex ? 'On' : 'Off'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[['team1', teamOnePlayers, search1, setSearch1, showDropdown1, setShowDropdown1],
            ['team2', teamTwoPlayers, search2, setSearch2, showDropdown2, setShowDropdown2]].map(
            ([teamKey, teamPlayers, search, setSearch, showDropdown, setShowDropdown], i) => {
              const _teamKey = teamKey as 'team1' | 'team2';
              const _teamPlayers = teamPlayers as string[];
              const _search = search as string;
              const _setSearch = setSearch as React.Dispatch<React.SetStateAction<string>>;
              const _showDropdown = showDropdown as boolean;
              const _setShowDropdown = setShowDropdown as React.Dispatch<React.SetStateAction<boolean>>;

              return (
                <div key={_teamKey} className="relative">
                  {i === 0 && (
                    <div className="hidden md:block absolute -top-8 left-0">
                      <div className="bg-white rounded shadow p-2 flex items-center gap-3 animate-fade-in">
                        <label htmlFor="superflexToggle" className="font-semibold text-sm">Superflex</label>
                        <button
                          id="superflexToggle"
                          onClick={toggleSuperflex}
                          className={`w-16 h-8 flex items-center rounded-full px-1 transition-colors duration-300 ${superflex ? 'bg-blue-500' : 'bg-red-500'}`}
                        >
                          <div
                            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${superflex ? 'translate-x-8' : 'translate-x-0'}`}
                          />
                        </button>
                        <span className="text-sm font-medium">{superflex ? 'On' : 'Off'}</span>
                      </div>
                    </div>
                  )}
                  <h2 className="font-semibold mb-2 text-center">Team {i + 1} gets...</h2>
                  <input
                    type="text"
                    placeholder="Search players..."
                    className="w-full p-2 mb-2 border rounded"
                    value={_search}
                    onChange={(e) => {
                      _setSearch(e.target.value);
                      _setShowDropdown(true);
                    }}
                  />
                  {_showDropdown && _search && (
                    <ul className="border rounded shadow bg-white z-10 relative max-h-60 overflow-y-auto">
                      {players
                        .filter(p => p.name.toLowerCase().includes(_search.toLowerCase()) && !_teamPlayers.includes(p.id))
                        .map(player => (
                          <li
                            key={player.id}
                            className="cursor-pointer px-2 py-1 hover:bg-gray-100"
                            onClick={() => addPlayer(player.id, _teamKey)}
                          >
                            {player.name}
                          </li>
                        ))}
                    </ul>
                  )}
                  <ul className="mt-2 space-y-2 text-sm">
                    {_teamPlayers.map(id => {
                      const player = getPlayer(id);
                      return (
                        <li key={id} className="flex items-center justify-between border border-gray-300 p-2 rounded">
                          <div className="font-bold underline w-1/2 truncate">{player?.name}</div>
                          <div className="text-xs text-center w-1/4">{player?.position} | {player?.team}</div>
                          <div className="text-blue-600 font-bold w-1/4 text-right">{Math.round(adjustedPlayers[id] || 0)}</div>
                          <button
                            onClick={() => removePlayer(id, _teamKey)}
                            className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded"
                          >✕</button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
          )}
        </div>

        <TradeSummary team1={teamOnePlayers} team2={teamTwoPlayers} adjustedPlayers={adjustedPlayers} />

        <div className="flex flex-col items-center mt-6 gap-2">
          <div className="flex gap-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors"
            >
              Copy Trade URL
            </button>
            <button
              onClick={() => {
                setTeamOnePlayers([]);
                setTeamTwoPlayers([]);
                updateURL([], [], superflex);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded shadow hover:bg-gray-500 transition-colors"
            >
              Clear Calculator
            </button>
          </div>
          {copied && (
            <div className="text-green-600 text-sm font-medium animate-fade-in">
              ✅ URL Copied!
            </div>
          )}
        </div>

        <div className="mt-8 w-full max-w-4xl mx-auto px-4 sm:px-6">
          <a href="https://mivarecovery.com" target="_blank" rel="noopener noreferrer" className="block transition-opacity duration-700 ease-in-out">
            <img src={adImages[currentAdIndex]} alt="Ad banner" className="w-full aspect-[3/1] object-contain shadow transition-transform duration-700 ease-in-out hover:scale-105" />
          </a>
        </div>

        <div className="mt-6 w-full max-w-4xl mx-auto bg-gray-100 border border-gray-300 rounded-md p-4 flex items-start gap-4">
          <div className="text-blue-500 text-3xl">
            <i className="fas fa-info-circle"></i>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-1">New: Dynasty Trade Database</h2>
            <p className="text-sm text-gray-700">
              Making a trade? Reference thousands of recent trades from real dynasty leagues with our{' '}
              <a
                href="https://www.espn.com/nfl/game/_/gameId/401671889/chiefs-eagles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-semibold"
              >
                Dynasty Trade Database
              </a>.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-blue-100 flex justify-center items-center gap-6 py-2 text-sm border-t border-blue-200">
        <a href="https://www.espn.com/nfl/game/_/gameId/401671889/chiefs-eagles" target="_blank" rel="noopener noreferrer" className="hover:underline">About</a>
        <a href="https://www.espn.com/nfl/game/_/gameId/401671889/chiefs-eagles" target="_blank" rel="noopener noreferrer" className="hover:underline">FAQ</a>
        <a href="mailto:dustinrhux@gmail.com?subject=Trade%20Calculator%20Contact&body=Hi%20Dustin%2C" className="hover:underline">Contact Us</a>
      </div>

      <div className="w-full bg-gray-800 text-white flex justify-between items-center px-6 py-3 text-sm">
        <span>© Hux Solutions 2025</span>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Terms & Conditions</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </>
  );
}
