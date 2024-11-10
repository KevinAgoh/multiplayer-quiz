import http from 'node:http';
import { Server } from 'socket.io';

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: { origin: '*' }
});

io.on('connection', socket => {
  console.log(`connect: ${socket.id}`);

  socket.on('joinGame!', () => {
    console.log(`hello from ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

io.listen(3001);

setInterval(() => {
  io.emit('message', new Date().toISOString());
}, 1000);
