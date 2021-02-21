import "./CustomerDashboard.css";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import io from 'socket.io-client';
import ProposalItem from "../ProposalAd/ProposalItem";
import { Link } from "react-router-dom";

const ENDPOINT = 'http://localhost:8010'


export default function CustomerDashboard(props) {
    const socketRef = useRef();

    let  id = props.user.id ;
    const [jobes,setJobes] = useState([]);
    let [count,setCount] = useState({
        count:0
    });


    const incrementCount = () => {
        setCount(prevCount => {
            return {
                count: parseInt(prevCount.count) + 1
            }
        })
    }
    

   
    useEffect(()=>{
            axios.get(`http://localhost:8010/api/jobpost/customer/${id}`).then(res =>{
                setJobes(res.data);
                console.log(res.data)
            });
            
            socketRef.current = io.connect(ENDPOINT);
            socketRef.current.on('sendnotification', (notify) => {
                console.log(notify)
                if(notify){
                    incrementCount()
                }
                
              })
              
             axios.get(`http://localhost:8010/api/jobproposals/customer/${id}`).then(res =>{
                setCount(res.data);
                 console.log(res.data);
             });
     },[]);

    return(
        <>          
        <section className="profile-container">
            <div className="profile-container-title">
                Hello, {props.user.userName}
            </div>
            <div className="profile-separation"></div>
            <div className="profile-container-offers">
                <h3>Offers  <span className="yellow-icon">◣</span> </h3>
                <div className="profile-offers">
                    <img src={`/image/image1.png`} alt="dashboard"/>
                    <div className="profile-newoffers">You have  {count.count} { count.count > 1 ? "offers" : "offer"} for your posts.</div>
                    <div className="profile-button">
                        <div className="profile-button-link-id"> 
                          <Link className="profile-proposal-link"to="/customer/proposal" >CLICK TO SEE</Link>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className="profile-posts-container">
                <div className="profile-posts">
                <h3>Your Posts <span className="yellow-icon">◣</span> </h3>
                { jobes.length>0 && (
                <div className="profile-posts-item">
                    {jobes.map(job => {
                    return (
                    <ProposalItem key ={job.id } id={id} {...job}/>
                    )})
                }
                </div> )}
                { jobes.length <= 0 && (  <div className="profile-posts-item"> 
                  <span>You don't have any job posting yet !</span></div>)}
                </div>
                <div className="profile-newpost">
                    <div>Create a new Post</div>
                    <Link to="/postAd" className='newjobpost-link'>CREATE POST</Link>
                    <img src={`/image/image2.jpg`} alt="dashboard"/>
                </div>
            </div>
        </section>)
        </>
    )

}