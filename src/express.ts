import express from 'express';

import { WebSocket, WebSocketServer } from 'ws';

const app = express();

app.get('/', (req, res) => {
    res.send("hello from websocket server");
});

const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(socket){
    socket.on('error', console.error);
    socket.on('message', function message(data, isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data , { binary: isBinary });
            }
        });
    });
    socket.send('Hi there, I am a WebSocket server');
});
