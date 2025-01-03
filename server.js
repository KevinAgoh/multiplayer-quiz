import http from 'node:http';
import { Server } from 'socket.io';

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: { origin: '*' }
});

io.on('connection', socket => {
  console.log('a user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.listen(3001);
