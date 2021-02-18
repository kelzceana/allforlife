import React from 'react';

export default function ProviderChat(props) {

  return( 
    <div class="container">
      <img src="https://www.w3schools.com//w3images/avatar_g2.jpg" alt="Avatar" />
      <p>{props.message}</p>
      <span class="time-right">{props.name}</span>
  </div>
  )
}