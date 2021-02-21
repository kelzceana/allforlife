import React, {useState, useEffect} from 'react';
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import ProviderChat from './ProviderChat'
import CustomerChat from './CustomerChat'
import './index.css'
import ProposalAd from '../ProposalAd';

let socket;
const ENDPOINT = 'http://localhost:8010'

export default function Chat(props) {

  const [state, setState] = useState({message:'', name: props.username})
  const [chat, setChat] = useState([]);


  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('message', ({name, message}) => {
      setChat([...chat, {name, message}])
    })
  }, [state])

  const onTextChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const {name, message} = state;
    socket.emit('message', {name, message})
    setState({message:'', name})
  }

  const renderChat = () => {
    console.log(chat, "chat")
    return chat.map(({name, message}, index) => (

      props.type === 'customer' ? <CustomerChat key= {index} name={name} message={message} /> : <ProviderChat key= {index} name={name} message={message} />
      

    ))
  }

  return (
    <div className="card">
      <div className="chat-container">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
      <form onSubmit={onMessageSubmit}>
        <div>
          <TextField
            name="message"
            onChange={e => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      
    </div>
  )
}