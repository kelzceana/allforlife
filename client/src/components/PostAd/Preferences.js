import React from "react";

import Select from "./Select";
import Button from './Button'
import Timeline from './TimeLine'

import "./Preferences.css";

//Array for countries
const country = ['United States', 'Canada'];
const language = ['ADL','English'];
const ethnicity = ['Africian-Americian','Asian','Hispanic and Latino','Native American'];
const faith = ['Buddhist','Chritsian'];


export default function Preferences(props) {
    return(

        <>
        <div className="post-description-container">
        <Timeline  width={props.timeline}/>
                <div className="post-description-progress1">
                   <span>Step 3/6</span> 
                </div>
  
                <div className="description-container">
                  <div className='h3-heading'>
                    <h3>Preferences</h3>
                  </div>           
                <div className="preference-details">
                <Select 
                heading='Language' 
                listArray={language} 
                name='language' 
                filter={props.language}
                {...props} 
                handleChange={props.handleChange}
                />
                <Select 
                heading='ETHNICITY' 
                listArray={ethnicity} 
                name='ethnicity' 
                filter={props.ethnicity}
                {...props} 
                handleChange={props.handleChange}
                />
                <Select 
                heading='FAITH' 
                listArray={faith} 
                name='faith' 
                filter={props.faith}
                {...props} 
                handleChange={props.handleChange}
                />
                <Select 
                heading='COUNTRY' 
                listArray={country} 
                name='country' 
                filter={props.country}
                {...props} 
                handleChange={props.handleChange}
                />
                </div>                      
                <div className="button-nav">
                    <Button onBack={props.onBack} name="Back"/>
                    <Button onNext={props.onNext}  name="Next"/>
                </div>
            </div>              
        </div>
      </>
    )
}