import './MoreInfo.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, Link, useHistory} from 'react-router-dom';


export default function MoreInfo(props){

  const { id } =useParams();
  const [showDetails, setShowDetails] = useState(true);
  const [proposalItem, setProposalItem] = useState(null);
  let history = useHistory();
  console.log("I am proposalItem", proposalItem);

  useEffect(() =>{
    axios.get(`http://localhost:8010/api/jobproposals/proposalItem/${props.user.id}/${id}`)
    .then(res => {
      if(res.status === 200){
        setProposalItem(res.data);
        console.log("I am from more info" +JSON.stringify(res.data));
      }
    })
  },[props.user.id])

  // function handleEvent(){
  //   axios.post(`http://localhost:8010/api/notifications/${proposalItem.id}`)
  //   .then(res => console.log(res.data));
  // } 

  const dealAccept = () => {
    axios.post(`http://localhost:8010/api/jobpost/accepted/${proposalItem.job_posting_id}`)
    .then(() => {
      alert("Thanks for choosing this person");
      history.push('/customer/dashboard');
    })
  }

   return proposalItem && <div className="customer-proposal-view-container">
       <div className="customer-proposal-main-containerr" style={{overflowY:'unset'}}>
        <div className='more-info-container1'>
          <div className='more-info-container2'>
        <div className="customer-proposal-profile-picture">
          <img  src="/image/providerprofilepic.png" alt="provider"></img>
        </div>
        <div className="customer-proposal-profile-summary">
          <div>
            <h4 style={{margin:"0"}}>allforlife Pricebreaker Service</h4>
            <p style={{fontSize:"0.5rem", margin:"0"}}>
              Getting you the best price possible
            </p>
                </div>
                <br />
                <div>
                  <h5 style={{margin:"0"}}>Summary</h5>
                  <p style={{fontSize:"0.5rem", margin:"0"}}>
                    If you decide you to proceed with {proposalItem.first_name} {proposalItem.last_name},chat with them to find out more.
                  </p>
                </div>
                <br />
                <div>
                  <h5 style={{margin:"0"}}>MENTAL HEALTH PROVIDER</h5>
                  <p style={{fontSize:"0.5rem", margin:"0"}}>
                  {proposalItem.first_name} {proposalItem.last_name} {proposalItem.degree}, {proposalItem.location}
                  </p>
                  <div className="offers-chat"> 
                    Offer  <input type="text"  value={"0.00"} disabled/> 
                  </div>
                  <div className="offers-chat-button" >
                    <Link onClick={e => (!props.user.id || !proposalItem.provider_id) ? e.preventDefault() : null}   to ={`/chat/?ID1=${props.user.id}&ID2=${proposalItem.provider_id}&name=kelz222`}>
                      <button type="submit">chat</button>
                    </Link> 
                  </div> 
                </div>
              </div>
        </div>
        <div  className="tabs-containerr">
           <div className={showDetails ? "tabs-container-active" :"tabs-container"}
           onClick={()=> {setShowDetails(true)}}>DETAILS</div>
           <div className={!showDetails ? "tabs-container-active" :"tabs-container"}
           onClick={()=> {setShowDetails(false)}}>MORE INFORMATION</div>
         </div>
         <div className="tabs-container-content">
         {showDetails && proposalItem.aboutme }
         {!showDetails && (

           <>
            { proposalItem.therapy && 
            <>
            <h5>Therapy</h5>
             <p> {proposalItem.therapy}</p> 
             </>
             }
           { proposalItem.country && 
            <>
            <h5>Country</h5>
             <p> {proposalItem.location}</p> 
             </>
             }
            { proposalItem.age && 
            <>
            <h5>Age</h5>
             <p> {proposalItem.age}</p> 
             </>
             }

          { proposalItem.price && 
            <>
            <h5>Budget </h5>
             <p> {proposalItem.price}</p> 
             </>
             }

            { proposalItem.ethnicity && 
            <>
            <h5>Ethnicity</h5>
             <p> {proposalItem.ethnicity}</p> 
             </>
             }

           { proposalItem.availability_days && 
            <>
            <h5>Available days in the week</h5>
             <p> {proposalItem.availability_days}</p> 
             </>
             }

           { proposalItem.availabilityfrom && 
            <>
            <h5>Available Time</h5>
             <p> {proposalItem.availabilityfrom} to {proposalItem.availabilityto}</p> 
             </>
             }

          </> 
         )}
         </div>


         <div className="offers-deal"> 
         <Link className="offers-back" to={`/customer/proposal`}>
         <button > Back </button>
         </Link>
         <button className="offers-accept" onClick={dealAccept}> Accept Deal </button>        
         </div>
       </div>
      </div>
   </div>
}