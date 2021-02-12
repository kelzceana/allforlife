import Button from './Button'
import Timeline from './TimeLine'
import Time from './Time';
import "./Review.css";

export default function Review(props) {

    
    return(

        <div className="post-description-container">
    
                <Timeline  width={props.timeline}/>     
            <div className="post-description-progress1">
            <span>Step 6/6</span> 
            </div>

            <div className="description-container">
                <h3>Review</h3>
                <div className="review-container">
                    <div className="review-container-left">
                        <fieldset>
                            <legend>Problem description</legend>
                            <p> {props.description}
                            </p>
                        </fieldset>
                        <fieldset>
                            <legend>Details</legend>
                            <div className="review-symptomes">
                              {
                                  props.symptomes.map(symptome =>{
                                      return <div className="symptomesshosen">{symptome}</div>
                                  })
                              }
                              </div>
                                <p>{props.therapy}</p>
                                <p>{props.insurance}</p>
                                <p>{props.age}</p>
                                <p>{props.sexuality}</p>
                        </fieldset> 
                        <fieldset>
                            <legend>Preferences</legend>
                                <p>{props.language}</p>
                                <p>{props.ethnicity}</p>
                                <p>{props.faith}</p>
                                <p>{props.country}</p>
                        </fieldset>     
                        </div>
                    <div className="review-container-rigth">
                        <fieldset>
                                <legend>Budget</legend>
                                <p>{props.typeOfPayment}</p>
                                From<input type="text"  value={`${'$ '} ${props.minPrice} `}disabled /> to
                                <input type="text"  value={`${'$ '} ${props.maxPrice} `} disabled/>
                        </fieldset> 
                        <fieldset>
                                <legend>Availability</legend>
                               
                                <div className="review-availability">
                                <div className="review-availability-freq">
                                    <p>{props.appointmentFrequency}</p>
                                </div>
                                <img src={`./image/${props.timeRequirement}.png`} alt={props.timeRequirement}></img>
                                </div>                          
                                From<input type="text"  value={props.availabilityFrom} disabled /> to
                                <input type="text"  value={props.availabilityTo} disabled/>


                        </fieldset>  
                    </div>     
                </div>
                <div className="button-nav1">
                    <Button onBack={props.onBack} name="Back"/>
                    <Button onNext={props.onPost}  name="Post"/>
                </div>
                
            </div>
       </div>

    )
}