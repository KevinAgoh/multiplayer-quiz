import { ReactNode, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import QuizForm from './components/QuizForm/QuizForm';
import { SocketContext } from './contexts/SocketContext';
import { Question } from './types/game';

const socket = io('localhost:3001');

function App(): ReactNode {
  const [gameId, setGameId] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<Question[] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
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

  return (
    <SocketContext.Provider value={socket}>
      {!gameId && (
        <div>
          <QuizForm quiz={quiz} setQuiz={quiz => setQuiz(quiz)} />
          {/* <button onClick={handleCreateGame}>Create Game</button> */}
        </div>
      )}
    </SocketContext.Provider>
  );
}

export default App;
