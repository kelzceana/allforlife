import "./ProviderDashboard.css";
import ProposalAd from "../ProposalAd";
import NotificationItem from "./NotificationItem";

export default function ProviderDashboard (props) {

  return (
    <>   
    <section className="profile-container" >
        <div className="profile-container-title">
            Hello, {props.user.userName}
        </div>
        <div className="profile-separation"></div>
        <div className="profile-proposals-container">
            <div className="profile-proposals">
                <h3>Look for opportunities <span className="yellow-icon">◣</span> </h3>
                <ProposalAd providerId={props.user.id} providerUsername={props.user.userName}/>
            </div>
        </div>
        <div className="profile-proposals-container">
            <h3>Notifications <span className="yellow-icon">◣</span> </h3>
            {/*need to map notifications here*/} <NotificationItem  providerId={props.user.id}/>
        </div>

    </section>
    </>
)

}