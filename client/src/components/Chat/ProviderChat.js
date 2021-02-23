import React from 'react';

export default function ProviderChat(props) {

  return( 
    <div className="container">
      <img src="https://www.w3schools.com//w3images/avatar.jpg" alt="Avatar" />
      <p>{props.message}</p>
      <span className="time-right">{props.name}</span>
  </div>
  )
}