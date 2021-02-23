import "./ProviderDashboard.css";
import {useState, useEffect, useRef} from "react";
import io from 'socket.io-client';
import ProposalAd from "../ProposalAd";
import NotificationItem from "./NotificationItem";
const ENDPOINT = 'http://localhost:8010'
function play() {
    var audio = new Audio(
'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
    audio.play();
}
export default function ProviderDashboard (props) {
    const [customerUsername, setcustomerUsername] = useState(null);
    const [customerID, setCustomerID]= useState(null);
    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = io.connect(ENDPOINT);
        socketRef.current.emit('join', props.user.id)
        //receive notification
        socketRef.current.on('message', (message) => {
            console.log(message, "message")
            setCustomerID(message.senderID !== props.user.id? message.senderID: null)
            setcustomerUsername(message.sendername !== props.user.userName? message.sendername : null)
            play()
        })
    }, []);
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
                {customerID && <NotificationItem  senderUsername = {customerUsername} customerID={customerID} providerUsername={props.user.userName} providerId={props.user.id}/>}
            </div>
        </section>
        </>
)
}