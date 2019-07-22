import debug from 'debug';
import dotenv from 'dotenv';
import http from 'http';
import socketIo from 'socket.io';
import env from './config/environment';
import app from './app';

dotenv.config();
const logger = debug('log');
const server = http.createServer(app);

const io = socketIo(server);

global.io = io;

io.on('connection', (client) => {
  logger(`Socket connection established with ${client.id}`);
  client.on('disconnect', () => {
    logger('Socket disconnected');
  });
});

server.listen(env.PORT, () => {
  logger(`Find me on http://localhost:${env.PORT}`);
});
