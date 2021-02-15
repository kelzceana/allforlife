import { Link } from "react-router-dom";


export default function RegisterDecision(props) {

   

    return(
        <div className="landing-container">
                <div className="landing-container-box">
                  <h2>Register As</h2> 
                  <div className="landing-separation"></div> 
                  <div className="landing"> 
                      <div className="landing-for">
                        <div className="myself">
                            <div className="myself-desc">
                            <Link to='/customerregister'>
                                <img src={`./images/mySelf.png`} alt="mySelf"></img>
                            </Link>
                                <div className="myself-title">customer</div>
                            </div>
                        </div>
                        <div className="loved-one">
                            <div className="myself-desc">
                            <Link to='/providerregister'>
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
