import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomerProposalItem from './CustomerProposalItem';
import './CustomerProposals.css';

export default function CustomerProposal(props) {

  const [proposalInfo, setProposalInfo] = useState([]);

  console.log("i am state proposalInfo " + JSON.stringify(proposalInfo));

  useEffect(() =>{
    axios.get(`http://localhost:8010/api/jobproposals/customerlist/${props.user.id}`)
    .then(res => {
      console.log("I am response " + JSON.stringify(res.data));
      if(res.status === 200){
        console.log("I am inside res loop with status 200")
        setProposalInfo(res.data);
      }
     
    })
  },[props.user.id])

  return <div className="customer-proposal-view-container">
    <div className="customer-proposal-main-container">
      <div className="customer-proposal-main-header">
        <h3 style={{padding:"0.4em"}}>You have recieved new Proposals</h3>
      </div>
     {proposalInfo && proposalInfo.map(proposal => <CustomerProposalItem key={proposal.id} proposal={proposal} />)}
    </div>
    </div>

}