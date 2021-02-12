
import "./Landing.css"
import Button from './Button'

export default function Landing(props) {

    return(
        <div className="landing-container">
                <div className="landing-container-box">
                  <h2>Create a new post</h2> 
                  <div className="landing-separation"></div> 
                  <div className="landing"> 
                      <h3>Who need help ?</h3>
                      <div className="landing-for">
                        <div className="myself">
                            <input type="radio"  name="appointmentFor" value="mySelf" onChange={props.handleChange} />
                            <div className="myself-desc">
                                <img src={`./image/mySelf.png`} alt="mySelf"></img>
                                <div className="myself-title">Myself</div>
                                <span className="myself-text">I am looking professional help for myself</span>
                            </div>
                        </div>
                        <div className="loved-one">
                            <input type="radio"  name="appointmentFor" value="lovedOne" onChange={props.handleChange} />
                            <div className="myself-desc">
                                <img src={`./image/lovedOne.png`} alt="lovedOne"></img>
                                <div className="myself-title">Loved One</div>
                                <span className="myself-text">I am looking professional help for someone else</span>
                                </div>
                            </div>
                        </div>
                      <div className ="start-btn">
                      <Button onNext={props.onNext}  name="Next"/>
                      </div>
                  </div>
                 
                </div>
            </div>
    
    )
}