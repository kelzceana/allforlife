import React from 'react';


export default function Select(props){
  console.log(props, "props here")
  const { heading,listArray,name} = props;
  return(
    <>
    {heading && <h5>{heading}</h5>}
    <select name={name} onChange={props.handleChange}>
     <option>{props.filter}</option>
     {listArray.map((item,index) => {return <option key={index} value={item}> {item} </option>})}
     </select>
    </>
  )
 
}