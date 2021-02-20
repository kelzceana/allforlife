import './MoreInfo.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import ProposalItem from '../ProposalAd/ProposalItem';

export default function MoreInfo(props){

  const { id } =useParams();
  const [proposalItem, setProposalItem] = useState(null);
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

   return proposalItem && <div className="customer-proposal-view-container">
       <div className="customer-proposal-main-container" style={{overflowY:'unset'}}>
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
                </div>
              </div>
        </div>
        <div>I am second div</div>
        <div>I am third div</div>
      </div>
      <Link onClick={e => (!props.user.id || !proposalItem.provider_id) ? e.preventDefault() : null}   to ={`/chat/?ID1=${props.user.id}&ID2=${proposalItem.provider_id}`}>
        <button type="submit">chat</button>
      </Link> 
      </div>

   </div>
}