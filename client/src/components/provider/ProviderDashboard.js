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
    const [sender, setSender] = useState(null)

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect(ENDPOINT);
        socketRef.current.emit('join', props.user.id)
        //receive notification
        socketRef.current.on('message', (message) => {
            console.log(message, "message")
            setSender(message.sendername !== props.userName? message.sendername : null)
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
                    <ProposalAd providerId={props.user.id} providerUsername="kelechi"/>
                </div>
            </div>
            <div className="profile-proposals-container">
                <h3>Notifications <span className="yellow-icon">◣</span> </h3>
                {/*need to map notifications here*/} <NotificationItem  senderUsername = {sender} providerId={props.user.id}/>
            </div>
    ​
        </section>
        </>
)
}