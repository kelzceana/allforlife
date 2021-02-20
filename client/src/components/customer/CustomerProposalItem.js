import {Link } from 'react-router-dom';

export default function CustomerProposalItem (props) {
  return (
    <>  
    <div className="customer-proposal-body">
      <div className="customer-proposal-inner">
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
                    If you decide you to proceed with {props.proposal.first_name} {props.proposal.last_name},chat with them to find out more.
                  </p>
                </div>
                <br />
                <div> 
                  <h5 style={{margin:"0"}}>MENTAL HEALTH PROVIDER</h5>
                  <p style={{fontSize:"0.5rem", margin:"0"}}>
                  {props.proposal.first_name} {props.proposal.last_name} {props.proposal.degree}, {props.proposal.location}
                  </p>
                </div>
              </div>
              <div className="customer-proposal-item-body">
                <p>Description:{props.proposal.description}</p>
                <p style={{fontSize:"0.6rem"}}>Budget: {props.proposal.price}</p>
              </div>
            </div>
            <div className="customer-proposal-button">
             <Link to={`/moreinfo/${props.proposal.id}`}>More Info</Link>
            </div>
            </div>
          </>
  )
}