
import axios from "axios";
import {useEffect, useState} from "react";
import ProposalForm from "./ProposalForm";
import { Link } from 'react-router-dom';

export default function ProposalItem(props){
    const [sympotomes,setSymptomes]=useState([]);

    //get symptomes for a specific job posting ID 
    useEffect(() => {
        axios.get(`http://localhost:8010/api/jobpost/symptomes/${props.id}`).then(res =>{
          setSymptomes(res.data);     
        });      
    
      },[]);
  
    //show somes others informations about job posting
    function showinfos(){
        let info =[];
        if(props.appointmentfrequency){
            info.push(props.appointmentfrequency);
        }
        if(props.timerequirement){
            info.push(props.timerequirement);
        }  
        if(props.therapy){
            info.push(props.therapy) ;
        }
        if(props.language){
            info.push(props.language );
        }
        if(props.age ){
            info.push(props.age);
        }
        if(props.ethnicity){
            info.push(props.ethnicity);
        }
        if(props.faith){
            info.push(props.faith );
        }
        if(props.country){
            info.push(props.country);
        }
        if(props.sexuality){
            info.push(props.sexuality);
        }
        if(props.insurance){
            info.push(props.insurance);
        }
        if(props.postcreationtimezone){
            info.push(props.postcreationtimezone);
        }
        let infos="";
        for(let index=0; index< info.length; index++){
            if(index !== info.length-1){
                infos += info[index]+" / ";
            } else{
                infos += info[index]
            }
        }
        return infos;
    }
    return(
        <article className="proposalad-list-item">
                  <div className="item-description">
                     <h3>{props.title}</h3>
                     <h4> {showinfos()} </h4>
                     <p> <strong>Description</strong> : {props.description}</p>
                     <div className="item-symptomes-container">
                         {sympotomes.map(symptome=>{return (
                            <div className="item-symptomes" key={symptome.id}>{symptome.name}</div>
                         )})}                    
                    </div>
                  </div>
                  <div className="item-budget-apply">
                      <div className="item-budget">Budget: ${props.maxprice}</div>
                      <Link to={`/proposalform/${props.id}`}>
                      <button>APPLY</button>
                      </Link>
                  </div>

              </article>
    )
}