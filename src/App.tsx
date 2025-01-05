import { ReactNode, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('localhost:3001');

function App(): ReactNode {
  const [gameId, setGameId] = useState<string | null>(null);

  const [players, setPlayers] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('game-created', gameData => {
      console.log('Game created', gameData);
      setGameId(gameData.id);
      setPlayers([...players, gameData.players]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('game-created');
    };
  }, [players]);

  const handleCreateGame = () => {
    socket.emit('create-game', { name: playerName });
  };

  return (
    <>
      {!gameId && (
        <div>
          <input
            type='text'
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            placeholder='Enter your name'
          />
          <button onClick={handleCreateGame}>Create Game</button>
        </div>
      )}
    </>
  );
}

export default App;
