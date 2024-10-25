import express from 'express';
import http from 'http';
import socket from 'socket.io';

const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);

// Set static folder
app.use(express.static('public'));

// Socket setup
const io = socket(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
