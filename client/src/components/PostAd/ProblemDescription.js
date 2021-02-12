import React, { useState } from 'react';
import "./ProblemDescription.css"
import Button from './Button'
import Timeline from './TimeLine'

import useTimeLine from '../../hooks/useTimeLine';


export default function PostDescription(props) {
    
    
    
    return(
     <div className="post-description-container">
    
                <Timeline  width={props.timeline}/>

                <div className="description-container">
                    <h3>Problem Description</h3>
                    <div className="containerDes"> 
                        <div className="problemDescription">
                                <p>Here you can describe and 
                                    give more details
                                    about the situation that you
                                    are living and how we can help you.
                                </p>
                                <div className='desc'><img src ="./image/Doubt.png"  alt="description"/></div>
                        </div>
                        <div className="description">
                            <textarea value={props.description} name= "description" onChange={props.handleChange} > </textarea>
                            <div className="button-nav">
                            <Button onBack={props.onBack} name="Back"/>
                            <Button onNext={props.onNext}  name="Next"/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            
           </div>
    
    )
}
