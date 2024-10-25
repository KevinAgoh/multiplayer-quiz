import { useState } from 'react';

const JoinGameForm = () => {
  const socket = io.connect('http://localhost:4000');
  const [username, setUsername] = useState('');

  const joinGame = () => {
    if (username !== '') {
      socket.emit('join_room', { username });
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
      <button onClick={joinGame}>Join</button>
    </div>
  );
};

export default JoinGameForm;
