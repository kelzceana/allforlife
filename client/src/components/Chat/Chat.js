import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './index.css'
import ProviderChat from './ProviderChat'
import CustomerChat from './CustomerChat'


export default function Chat({ location }){
  const {ID1, ID2, name} = queryString.parse(location.search)
  // const usersObj = {
  //   customerID,
  //   customerName
  // }
  // console.log(usersObj)
  const messagesFromStorage = localStorage.getItem("chat")
  const [yourID, setYourID] = useState();
  const [receiverName, setReceiverName] = useState("")
  const [messages, setMessages] = useState([]);
  const [textArea, setTextArea] = useState("");
  const socketRef = useRef();
  const ENDPOINT = 'http://localhost:8010'
 
  //const username = "kelz"
  

  //function handlers...... start

  const receiveMessage = (message) => {
    setMessages(oldMessages => [...oldMessages, message])
    localStorage.setItem("chat", messages)
  }

  const sendMessage = (e) => {
    e.preventDefault(); 
    const messageObj = {
      body: textArea,
      id: yourID,
      receiverID: ID2,
      sendername: name
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
    socketRef.current.emit('join', ID1)
    socketRef.current.on('message', (message) => {
      console.log(message, "her her")
      receiveMessage(message)
      setReceiverName(message.sendername !== name? message.sendername : null)
    })
  }, []);


  //JSX
  return(
    <div className="chat-card">
      <div className="chat-container">
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return <CustomerChat key={index} name ={name} message={message.body} />
          }
          return <ProviderChat key={index}  name ={receiverName} message={message.body} />
     
        })}
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <div className="chat-textarea">
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





