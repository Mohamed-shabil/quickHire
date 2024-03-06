import express from 'express';
import http from 'http'
import socketio, { Socket } from 'socket.io';
import SocketService from './socket/socket';


const app = express();




const socketService = new SocketService();

const httpServer = http.createServer(app);

socketService.io.attach(httpServer)

export {socketService,httpServer}
