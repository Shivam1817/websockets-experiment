import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("Hi there, I am a WebSocket server");
});

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws){
    ws.on('error', console.error);

    ws.on('message', function message(data, isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send('Hi there, I am a WebSocket server');
});

server.listen(8080, () => {
    console.log("Server is listening on port 8080");
});