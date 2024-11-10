import { ReactNode, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import './App.css';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
const socket = io('localhost:3001');

function App(): ReactNode {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socket.on('message', data => {
      setLastMessage(data);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('hello!');
  };

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              isConnected={isConnected}
              lastMessage={lastMessage}
              sendMessage={sendMessage}
            />
          }
        />
        <Route path='/quiz' element={<Quiz />} />
      </Routes>
    </>
  );
}

export default App;
