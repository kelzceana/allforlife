import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'

import "./Details.css";
import Select from "./Select";
import Button from './Button'
import Timeline from './TimeLine'


 const therapy=["Acceptance and Commitment (ACT)","Adlerian","Art Therapy", 
 "Attachment-based", "Biofeedback", "Coaching"];
 const insurrance=["1199SEIU","ACI Specialty Benefits", "AMERIGROUP"];
 const age=["Adolescents/ Teenagers (14 to 19)", "Adults", "children (6 to 10)", "Elders(65+)"]
 const sexuality=['Bisexual','Gay','Lesbian'];

export default function Details(props) {
    const [symptomes, setSymptomes] = useState([]);
    //fetch symptomes from database
    useEffect(() => {
        axios.get("http://localhost:8010/api/jobpost/symptomes")
            .then(res => {
                console.log(res, "res")
                setSymptomes(res.data)
            })
    }, [])
    
    function checkSymptoms(evt){
     const newSymptomes=[...props.symptomes];
     const newSymptomesId = [...props.symptomesId]
        if(evt.target.checked){
            const find =newSymptomes.find(symptome =>  symptome === evt.target.name);
            const findId =newSymptomesId.find(symptomeId =>  symptomeId === evt.target.id);
            

            if(!find&&!findId){
                newSymptomes.push(evt.target.name);
                newSymptomesId.push(evt.target.id);

                props.addSymptomes( newSymptomes, newSymptomesId);
                //props.addSymptomes( newSymptomesId);
            }
        } else {
            const arr = newSymptomes.filter(symptome => symptome !== evt.target.name);
            props.addSymptomes( arr);
        }
    }
        

    return(
        <div className="post-description-container">
    
                <Timeline  width={props.timeline}/>
                <div className="post-description-progress1">
                   <span>Step 3/6</span> 
                </div>

                <div className="description-container">
                    <h3>Details</h3>
                    <br/>
                    <h5>SYMPTOMS</h5> 
                    <br/>
                    <div className="container-symptomes">
                    {symptomes.map((item,index) => {return (
                            <label key={index} className="container-symptomes-1">
                            <span className="symptomes-text" >{item.name}</span>
                            <input type="checkbox" name={item.name} id={item.id} value={item.name} checked={props.symptomes.find(symptome => symptome === item.name)? "checked" : ""} onClick={(evt)=>checkSymptoms(evt)} />
                            <span className="checkmark"></span>
                            </label>

                    )})}
                      
                    </div>
                    <div className="details-others">
                        <Select heading='TYPE OF THERAPY:' listArray={therapy} name='therapy' filter={props.therapy} {...props} handleChange={props.handleChange}/>
                        <Select heading='ISSURANCE:' listArray={insurrance} name='insurance'filter={props.insurance}{...props} handleChange={props.handleChange} />
                        <Select heading='AGE:' listArray={age} {...props} name='age' filter={props.age} {...props} handleChange={props.handleChange} />
                        <Select heading='SEXUALITY' listArray={sexuality} name='sexuality'filter={props.sexuality} {...props} handleChange={props.handleChange}/>                       
                    </div>                      
                    <div className="button-nav">
                    <Button onBack={props.onBack} name="Back"/>
                    <Button onNext={props.onNext}  name="Next"/>
                </div>     
               
                </div>
        </div>
    )
}
