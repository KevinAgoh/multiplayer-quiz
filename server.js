import http from 'node:http';
import { Server } from 'socket.io';
const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: { origin: '*' }
});

const games = {};
const players = {};

io.on('connection', socket => {
  console.log('a user connected:', socket.id);

  socket.on('disconnect', () => {
    handleDisconnect(socket);
  });

  socket.on('create-game', gameData => {
    createGame(socket, gameData);
    console.log('Game :', gameData);
  });
});

function handleDisconnect(socket) {
  Object.values(games).forEach(game => {
    game.players = game.players.filter(p => p.id !== socket.id);
  });
}

function createGame(socket, gameData) {
  const generateUniqueId = () => Math.random().toString(36).substring(2, 9);

  const game = {
    id: generateUniqueId(),
    players: []
  };
  games[game.id] = game;
  game.players.push({
    id: socket.id,
    name: gameData.name || 'Player'
  });
  socket.join(game.id);
  socket.emit('game-created', game);
}
io.listen(3001);
