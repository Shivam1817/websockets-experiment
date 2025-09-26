import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("Hi there, I am a WebSocket server");
});

const wss = new WebSocketServer({ server });

let usercount = 0;

wss.on('connection', function connection(socket){
    socket.on('error', console.error);

    socket.on('message', function message(data, isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data , { binary: isBinary });
            }
        });
    });
    console.log("user connected : ", ++usercount);
    socket.send('Hi there, I am a WebSocket server');
});

server.listen(8080, function() {
    console.log((new Date()) + "Server is listening on port 8080");
});