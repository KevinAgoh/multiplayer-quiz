import { ReactNode, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import QuizForm from './components/QuizForm/QuizForm';
import QuizSummary from './components/QuizSummary/QuizSummary';
import { SocketContext } from './contexts/SocketContext';
import { Player, Question } from './types/game';

const socket = io('localhost:3001');

const App = (): ReactNode => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<Question[]>();
  const [players, setPlayers] = useState<Player[]>([]);

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
          <QuizForm setQuiz={quiz => setQuiz(quiz)} />
        </div>
      )}
      {gameId && (
        <div>
          {quiz && <QuizSummary quiz={quiz} />}
          <h2>Players</h2>
        </div>
      )}
    </SocketContext.Provider>
  );
};

export default App;
