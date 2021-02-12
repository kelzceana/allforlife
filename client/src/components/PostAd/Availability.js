import "./Availability.css";
import Time from "./Time";
import Select from './Select';
import Button from './Button'
import Timeline from './TimeLine'

const timeZones = ['Atlantic Standard Time (AST)', 'Eastern Standard Time (EST)', 'Central Standard Time (CST)', 'Mountain Standard Time (MST)','Pacific Standard Time (PST)', 'Alaskan Standard Time (AKST)', 'Hawaii-Aleutian Standard Time (HST)', 'Samoa standard time (UTC-11)', 'Chamorro Standard Time (UTC+10'];
const appointmentFrequency=['Daily','Once a week','Twice a week','Thrice a week','Monthly'];

export default function Availability(props) {
    return(

        <div className="post-description-container">
    
            <Timeline  width={props.timeline}/>
            
            <div className="post-description-progress1">
            <span>Step 5/6</span> 
            </div>

            <div className="description-container">
                <h3>Availability</h3>
                <div className="budget-container">
                 <div className="budget-container-1">
                    <h5 className="budget-h5">How often do you expect the sections to happen?</h5>
                    <Select 
                       listArray={appointmentFrequency} 
                       name='appointmentFrequency' 
                       filter={props.appointmentFrequency}
                       {...props} 
                       handleChange={props.handleChange}
                    />
                  </div>
                  <div className="budget-container-2">
                    <h5 className="budget-h5">Do you have any time requirement?</h5>
                    <div className="availability-image">
                        <div className="availability-image-1">
                            <Time imageName='morning' alt='Morning' {...props} handleChange={props.handleChange}/>
                            <Time imageName='afternoon' alt='Afternoon'{...props} handleChange={props.handleChange}/>
                        </div>
                        <div className="availability-image-1">
                            <Time imageName='evening' alt='Evening' {...props} handleChange={props.handleChange}/>
                            <Time imageName='night' alt='Night'{...props} handleChange={props.handleChange}/>
                        </div>
                                                
                        </div>
        
                    <div className="min-max-range">
                      <label for="fromtime">From</label>
                      <input type="text"  name="availabilityFrom" value={props.availabilityFrom} onChange={props.handleChange}></input>
                      <label for="totime">To</label>
                      <input type="text" name="availabilityTo" value={props.availabilityTo} onChange={props.handleChange}></input>
                    <Select
                        listArray={timeZones} 
                        name='timeZones' 
                        filter={props.timeZones}
                        {...props} 
                        handleChange={props.handleChange}
                    />
                    </div>
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