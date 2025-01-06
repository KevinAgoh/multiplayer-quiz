import { useContext, useState } from 'react';
import { SocketContext } from '../../contexts/SocketContext';

const JoinGameForm = () => {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState('');

  const handleJoinGame = () => {
    if (username !== '') {
      socket.emit('join-game', { username });
    }
  };

  return (
    <div>
      <form action='JoinGame'>
        <input
          type='text'
          placeholder='Type your name'
          value={username}
          onChange={event => setUsername(event.target.value)}
          required
        />
      </form>
      <button onClick={handleJoinGame}>Join</button>
    </div>
  );
};

export default JoinGameForm;
