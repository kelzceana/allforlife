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
		zIndex:2,
		borderRadius:'50px',
		transition:'width 6s'
	}

  return(
    <div id="progress-bar-container">
	<ul>
		<li className=""><div className="step-inner">Problem Description</div></li>
		<li className=""><div className="step-inner">Details</div></li>
		<li className=""><div className="step-inner">Preferences</div></li>
		<li className=""><div className="step-inner">Budget</div></li>
		<li className=""><div className="step-inner">Availability</div></li>
		<li className=""><div className="step-inner">Review</div></li>
	</ul>
	
	<div id="line">
		<div  id="line-progress"  style={lineStyle}></div>
	</div>
	</div>
   )
}