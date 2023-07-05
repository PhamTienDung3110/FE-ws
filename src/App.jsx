import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [objectData, setObjectData] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://be-ws.onrender.com');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const message = event.data;

      try {
        const updatedObjectData = JSON.parse(message);
        setObjectData(updatedObjectData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }


  const handleClick = () => {
    const updatedObjectData = { ...objectData };
    const ramdomText = makeid(20);
    updatedObjectData.ramdomText = ramdomText
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      ws.send(JSON.stringify(updatedObjectData));
    };

    ws.onmessage = (event) => {
      const message = event.data;

      try {
        const updatedObjectData = JSON.parse(message);
        setObjectData(updatedObjectData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
  };

  return (
    <div>
      <button onClick={handleClick}>Update Object Data</button>
      <pre>{JSON.stringify(objectData, null, 2)}</pre>
    </div>
  );
}

export default App
