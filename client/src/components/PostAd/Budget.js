import React from 'react';
import Select from './Select';
import Button from './Button'
import Timeline from './TimeLine'


import "./Budget.css";


const typeOfPayment=['Per session','Daily','Monthly','One time only','I dont know yet'];

export default function Budget(props) {
    return(

        <div className="post-description-container">
    
           <Timeline  width={props.timeline}/>   
            <div className="post-description-progress1">
            <span>Step 5/6</span> 
            </div>

            <div className="description-container">
                <h3>Budget</h3>
                <div className="budget-container">
                 <div className="budget-container-1">
                    <h5 className="budget-h5">How would you like to pay for your sessions?</h5>
                    <Select 
                       listArray={typeOfPayment} 
                        name='typeOfPayment'
                        filter={props.typeOfPayment}
                        {...props} 
                        handleChange={props.handleChange}
                    />
                    <div className="budget-range">
                    <label for="budgetOption"><h5 className="budget-h5">Set your own budget range</h5></label>
                    </div>
                    <div className="min-max-range">
                      <span>From</span>
                      <input type="text" placeholder="$ 0.00" name="minPrice" value={props.minPrice}   
                        {...props} 
                         onChange={props.handleChange}></input>
                      <label for="minPrice">  To</label>
                      <input type="text" placeholder="$0.00" name="maxPrice" value={props.maxPrice} 
                        {...props} 
                        onChange={props.handleChange}></input>
                      <label for="maxPrice"></label>
                    </div>

                  </div>
                  <div className="budget-container-2" style={{width:'40%'}}>
                      <img src='/image/Budget.jpg' alt="budget" style={{width:'70%'}}></img>
                </div>
                </div>
                <div className="button-nav">
                    <Button onBack={props.onBack} name="Back"/>
                    <Button onNext={props.onNext}  name="Next"/>
                </div>


            </div>
       </div>

    )
}