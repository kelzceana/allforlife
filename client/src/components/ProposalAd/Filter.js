
import { useState } from 'react';
import{FaAngleDown, FaAngleUp} from 'react-icons/fa';

export default function Filter(props){
    // this state is used to show wich icon should be diplayed
    const[show,setShow]=useState(false);
    
    return(
        <div className="proposalad-filter-item">
            <div className="filter-title">
                <h4>{props.title}</h4>
                {show && <FaAngleDown style= { {color: "gray", fontSize: "1.5em"}} onClick={() => setShow(!show)}/> }
                {!show && <FaAngleUp style= { {color: "gray", fontSize: "1.5em"}} onClick={() => setShow(!show)} /> }
            </div>
            {props.list.map((item,index) => {
                return (
                    <span key={index} className={show ? "filter-hide":"filter-show"}> 
                    <input key={item} name ={props.name} value={item} onChange={props.onChange} type="checkbox" />{item}</span> 
                )
            })}     
        </div>
    )
}



 

