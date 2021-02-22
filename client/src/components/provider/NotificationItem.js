import React from 'react';
import { Link } from 'react-router-dom';
export default function NotificationItem(props){
  return(
    <article className="proposalad-list-item">
              <div className="item-description">
                 <h3>{/* Job Proposal */}</h3>

                 {props.senderUsername && <p> <strong>{props.senderUsername}</strong> sent a message</p>}
              </div>
              <div className="item-budget-apply" style={{justifyContent:'flex-end'}}>
                  <Link onClick={e => (!props.customer_id) ? e.preventDefault() : null}   to ={`/chat/?ID1=${props.providerId}&ID2=${props.customer_id}&name=${props.providerUsername}`}>
                    <button  className="apply-active" type="submit">View Message</button>
                  </Link> 
              </div>
​
          </article>
)
}