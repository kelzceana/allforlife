import React from 'react';


export default function Time(props){
  const { imageName, alt } = props;

  return (
    <div className="individual-image">
      <input type="radio"  name="timeRequirement" value={imageName} onChange={props.handleChange} />
      <img src={`./image/${imageName}.png`} alt={alt}></img>
    </div>
  );

}