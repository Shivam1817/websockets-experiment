import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket|null>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(()=> {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log('WebSocket Client Connected');
      setSocket(socket);
    }
    socket.onmessage = (message) => {
      console.log('Received message:', message.data);
      setLatestMessage(message.data);
    }
    return () => {
      socket.close();
    }
  }, []);

  if(!socket){
    return <div>
      Connecting to socket server
    </div>
  }
  return (
    <>
      <input type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => {
        socket.send(message);
      }}>Send</button>
      <p>{latestMessage}</p>
    </>
  )
}

export default App
