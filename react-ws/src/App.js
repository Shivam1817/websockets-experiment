"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.css");
function App() {
    const [socket, setSocket] = (0, react_1.useState)(null);
    const [latestMessage, setLatestMessage] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            console.log('WebSocket Client Connected');
            setSocket(socket);
        };
        socket.onmessage = (message) => {
            console.log('Received message:', message.data);
            setLatestMessage(message.data);
        };
    }, []);
    if (!socket) {
        return <div>
      Connecting to socket server
    </div>;
    }
    return (<>
      <input type="text" placeholder="Type a message..."/>
      <button onClick={() => {
            socket.send("Hello from React client!");
        }}>Send</button>
      {latestMessage}
    </>);
}
exports.default = App;
