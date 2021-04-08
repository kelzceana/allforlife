import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import validate from 'uuid-validate';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './index.css'
import axios from "axios";
import ProviderChat from './ProviderChat'
import CustomerChat from './CustomerChat'
export default function Chat({ location }){
  const {ID1, ID2, name} = queryString.parse(location.search);
  const job_proposal_id = 72;
 
  const [yourID, setYourID] = useState();
  const [receiverName, setReceiverName] = useState("ramya2021")
  const [messages, setMessages] = useState([]);
  const [textArea, setTextArea] = useState("");
  const socketRef = useRef();
  const ENDPOINT = 'http://localhost:8010'
  
  //function handlers...... start
  const receiveMessage = (message) => {
    setMessages(oldMessages => [...oldMessages, message])
  }
  const sendMessage = (e) => {
      e.preventDefault();
      const messageData = {
        jobProposalID: job_proposal_id ,
        customerID: !validate(ID1)? ID1 : ID2,
        providerID: validate(ID1)? ID1 : ID2,
        type:  validate(ID1)? "provider" : "customer",
        message: textArea
      }
      axios.post('http://localhost:8010/api/messages/', messageData)
        .then(res => {
          if (res.status === 200) {
            const messageObj = {
              body: textArea,
              id: yourID,
              receiverID: ID2,
              sendername: name,
              senderID: ID1,
            };
            setTextArea("");
            socketRef.current.emit("send message", messageObj);
          }
        })
        .catch(err => console.log("error saving message"))
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
    //retrieve messages from database
    axios.get(`http://localhost:8010/api/messages/${job_proposal_id}`).then(res =>{
      const msgArr = []
      res.data.forEach(messageObj => {
        const msgObj = {
          body:messageObj.message,
          id: '',
          type:messageObj.type,
          receiverID: messageObj.type === 'customer'? ID2: ID1,
        }
        msgArr.push(msgObj)
      });
      setMessages(msgArr)
      console.log(res.data, "messages for database");
  });
  }, []);
  //JSX
  return(
    <div className="chat-card01">
    <div className="chat-card">
      <div className="chat-header">
        Chat room 
      </div>
      <div className="chat-container">
        {messages.map((message, index) => {
          if (message.id === yourID || message.type === "customer"  ) {
            return <CustomerChat key={index} name ={name} message={message.body} />
          }
          return <ProviderChat key={index}  name ={receiverName} message={message.body} />
        })}
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <div >
          <TextField
            name="message"
            onChange={handleChange}
            value={textArea}
            id="outlined-multiline-static"
            placeholder = "Say something"
            className="textfield"
          />
        </div>
        <button>Send Message</button>
      </form>
    </div>
    </div>
  )
}