import React from 'react';


export default function Time(props){
  const { imageName, alt } = props;

  return (
    <div className="individual-image">
      <div className="image-input">
      <input type="radio"  name="timeRequirement" value={imageName} onChange={props.handleChange} />
      <img src={`./image/${imageName}.png`} alt={alt}></img>
      </div>
      <div className="individual-image-title">
      <h3>{props.alt}</h3>
      </div>
      
    </div>
  );

}