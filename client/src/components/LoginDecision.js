import { Link } from "react-router-dom";

import './LoginDecision.css';


export default function LoginDecision(props) {

   

    return(
        <div className="landing-container">
                <div className="landing-container-box">
                  <h2>Login As</h2> 
                  <div className="landing-separation"></div> 
                  <div className="landing"> 
                      <div className="landing-for">
                        <div className="myself">
                            <div className="myself-desc">
                            <Link to='/customerlogin'>
                                <img src={`./images/mySelf.png`} alt="mySelf"></img>
                            </Link>
                                <div className="myself-title">Customer</div>
                            </div>
                        </div>
                        <div className="loved-one">
                            <div className="myself-desc">
                            <Link to='/providerlogin'>
                                <img src={`./images/mySelf.png`} alt="mySelf"></img>
                            </Link>
                                <div className="myself-title">Provider</div>
                                </div>
                            </div>
                        </div>
                  </div>
                 
                </div>
            </div>
    
    )
}
