import { ReactNode, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('localhost:3001');

function App(): ReactNode {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return <></>;
}

export default App;
