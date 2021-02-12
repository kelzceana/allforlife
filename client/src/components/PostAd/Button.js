import React from 'react';

export default function Button (props) {
  
  const back = `${props.name}`
  const next = `${props.name}`

  return ( 
      <button onClick={props.onBack? props.onBack :props.onNext}>{props.name? back: next}</button>
  )
}