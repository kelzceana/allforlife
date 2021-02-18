import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './index.css'
import ProviderChat from './ProviderChat'
import CustomerChat from './CustomerChat'


export default function Chat({ location, username }){
  console.log(location, "uu")
  const data = queryString.parse(location.search)
  console.log(username)
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [textArea, setTextArea] = useState("");
  const socketRef = useRef();
  const ENDPOINT = 'http://localhost:8010'
 
  //const username = "kelz"
  

  //function handlers...... start

  const receiveMessage = (message) => {
    setMessages(oldMessages => [...oldMessages, message])
  }

  const sendMessage = (e) => {
    e.preventDefault(); 
    const messageObj ={
      body: textArea,
      id: yourID
    };
    setTextArea("");
    socketRef.current.emit("send message", messageObj);
  }
  
  const handleChange = (e) => {
    setTextArea(e.target.value);
  }
   //function handlers...... end
  
  useEffect(() => {
    socketRef.current = io.connect(ENDPOINT);

    socketRef.current.on('getID', (socketID) => {
      setYourID(socketID);
    })
    socketRef.current.on('message', (message) => {
      receiveMessage(message)
    })
  }, []);


  //JSX
  return(
    <div className="card">
      <div className="chat-container">
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return <CustomerChat key={index} name ={username} message={message.body} />
          }
          return <ProviderChat key={index}  name ={username} message={message.body} />
     
        })}
      </div>
      <form onSubmit={sendMessage}>
        <div>
          <TextField
            name="message"
            onChange={handleChange}
            value={textArea}
            id="outlined-multiline-static"
            placeholder = "Say something"
          />
        </div>
        <button>Send Message</button>
      </form>
    </div>
  )

  
}





