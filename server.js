import http from 'node:http';
import { Server } from 'socket.io';
const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: { origin: '*' }
});

const currentGameData = { id: '', players: [] };

io.on('connection', socket => {
  console.log('a user connected:', socket.id);

  socket.on('disconnect', () => {
    handleDisconnect(socket);
  });

  socket.on('create-game', gameData => {
    createGame(socket, gameData);
    console.log('Game :', gameData);
  });

  socket.on('join-game', playerData => {
    addPlayerToGame(socket, playerData);
  });
});

function handleDisconnect(socket) {
  currentGameData.players.filter(player => player.id !== socket.id);
}

function createGame(socket, gameData) {
  currentGameData.id = gameData.id;

  socket.emit('game-created', gameData);
}

function addPlayerToGame(socket, playerData) {
  const player = {
    id: socket.id,
    username: playerData.username || 'Player',
    score: 0
  };
  currentGameData.players?.push(player);
  socket.join(currentGameData.id);
  socket.emit('player-joined', player);
}

io.listen(3001);
