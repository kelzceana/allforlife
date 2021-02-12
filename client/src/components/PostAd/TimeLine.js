import React from 'react';
import './TimeLine.css'

export default function Timeline(props) {

	//in-component styling
	console.log(props.width)
	const lineStyle = {
		content:" ",
		width:`${props.width}%`,
		height:'100%',
		background: '#207893', 
		background: 'linear-gradient(to right, #f5c109 0%,#f5c109 100%)',
		position:'absolute',
		"z-index":2,
		"border-radius":'50px',
		transition:'width 6s'
	}

  return(
    <div id="progress-bar-container">
	<ul>
		<li class=""><div class="step-inner">Problem Description</div></li>
		<li class=""><div class="step-inner">Details</div></li>
		<li class=""><div class="step-inner">Preferences</div></li>
		<li class=""><div class="step-inner">Budget</div></li>
		<li class=""><div class="step-inner">Availability</div></li>
		<li class=""><div class="step-inner">Review</div></li>
	</ul>
	
	<div id="line">
		<div  id="line-progress"  style={lineStyle}></div>
	</div>
	</div>
   )
}