import { ReactNode, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import JoinGameForm from './components/JoinGameForm/JoinGameForm';
import PlayersList from './components/PlayersList/PlayersList';
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
      setGameId(gameData.id);
    });

    socket.on('player-joined', playerData => {
      console.log('Player joined', playerData);
      setPlayers([...players, playerData]);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('game-created');
      socket.off('player-joined');
    };
  }, [players]);
  return (
    <SocketContext.Provider value={socket}>
      {!gameId && <QuizForm setQuiz={quiz => setQuiz(quiz)} />}
      {gameId && <JoinGameForm />}
      {gameId && quiz && <QuizSummary quiz={quiz} />}

      {players.length > 0 && (
        <>
          <h2>Players</h2>
          <PlayersList players={players} />
        </>
      )}
    </SocketContext.Provider>
  );
};

export default App;
