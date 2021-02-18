import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

export default function Join(){
  const[customer, setCustomer] = useState('');
  const[provider, setProvider] = useState('')

  return (
    <div className="joinOuterContainer">
    <div className="joinInnerContainer">
      <h1 className="heading">Join</h1>
      <div>
        <input placeholder="Customer" className="joinInput" type="text" onChange={(event) => setCustomer(event.target.value)} />
      </div>
      <div>
        <input placeholder="Provider" className="joinInput mt-20" type="text" onChange={(event) => setProvider(event.target.value)} />
      </div>
      <Link onClick={e => (!customer || !provider) ? e.preventDefault() : null} to={`/chat/new?customerID=${customer}&cutomername=kelz22&providername=ramya22&provider=${provider}`}>
        <button className={'button mt-20'} type="submit">Sign In</button>
      </Link>
    </div>
  </div>
  )
}