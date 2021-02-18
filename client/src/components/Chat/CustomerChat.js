import React from 'react';

export default function CustomerChat(props) {

  return(
    <div class="container darker">
    <img src="https://www.w3schools.com//w3images/avatar_g2.jpg" alt="Avatar" class="right" />
    <p>{props.message}</p>
    <span class="time-left">{props.name}</span>
  </div>
  )
}