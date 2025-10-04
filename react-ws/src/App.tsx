import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket|null>(null);

  useEffect(()=> {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log('WebSocket Client Connected');
      setSocket(socket);
    }
    socket.onmessage = (message) => {
      console.log('Received message:', message.data);
    }
    
  }, []);

  if(!socket){
    return <div>
      Connectiong to socket server
    </div>
  }
  return (
    <>
      
    </>
  )
}

export default App
