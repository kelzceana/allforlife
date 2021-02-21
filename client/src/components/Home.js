import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import HomeProposalItem from './HomeProposalItem';
const arr=["find a therapy","get a diagnosis","learn to improve","help a friend",
"help others","save lives","earn money","change the world"];

export default function Home(props){
 const [index,setIndex] =useState(0);


 useEffect(() => {
  let slider = setInterval(() => {
    let i = index;
    if(i === arr.length){
      i = -1;
    }
    setIndex(i + 1);
  }, 1500);
  return () => {
    clearInterval(slider);
  };
}, [index]);



  return (
    <>
    <div className="panel">
      <div className="panel-text">
        The Best Mental Help. Worldwide.
      </div>
      <div className="panel-text2"> You can <span>{arr[index]}</span></div>
    </div>
    <div className="jobposting-home-container-title">
      <div  style={{margin:'0', paddingTop:'0.5em'}}>CALL FOR HELP </div> <span className="yellow-icon">◣</span>
      <div className="home-line"></div>
    </div> 
    <div className="home-outer-container">
      <div className="home-container">
        <div className="home-customer-container">
          <div className="home-customer-image">
            <img className="customer-login-pic" src="./image/customer_login.png" alt="customer-login"></img>
          </div>
          <div className="home-inner-container">
            <div className="home-text-container">
              <h3>I'm USER</h3>
              <p>and I need help for me or a loved one</p>
            </div>
            <div className="decision-making">
              <div className="decision-making-link">
                <NavLink className="decision-link" to='/login/customer' >
                  SELECT
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="home-customer-container">
          <div className="home-inner-container">
            <div className="home-text-container">
              <h3>I'm PROVIDER</h3>
              <p>looking for an opportunity</p>
            </div>
            <div className="decision-making">
              <div className="decision-making-link">
                <NavLink className="decision-link" to='/login/provider' >
                  SELECT
                </NavLink>
              </div>
            </div>
          </div>
          <div className="home-customer-image">
            <img className="customer-login-pic" src="/image/provider_login1.jpg" alt="customer-login"></img>
          </div>
        </div>
      </div>
    </div>
    <div className="jobposting-home-container-title">
      <div>JOB POSTING  <span className="yellow-icon">◣</span></div>
      <div className="home-line"></div>
    </div>   
    <HomeProposalItem user={props.user} />

    </>
  )
}