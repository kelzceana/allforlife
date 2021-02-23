import React from 'react';

export default function CustomerChat(props) {

  return(
    <div className="container darker">
    <img src="https://www.w3schools.com//w3images/avatar_g2.jpg" alt="Avatar" className="right" />
    <p>{props.message}</p>
    <span className="time-left">{props.name}</span>
  </div>
  )
}