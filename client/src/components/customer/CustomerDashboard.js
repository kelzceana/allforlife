
import "./CustomerDashboard.css";
import {useState, useEffect} from "react";
import axios from "axios";
import ProposalItem from "../ProposalAd/ProposalItem";
import { Link } from "react-router-dom";


export default function CustomerDashboard(props) {
   let  id = props.user.id ;
    const [jobes,setJobes] = useState([]);
    const [count,setCount] = useState([]);

    useEffect(()=>{
            axios.get(`http://localhost:8010/api/jobpost/customer/${id}`).then(res =>{
                setJobes(res.data);
                console.log(res.data)
            });

            axios.get(`http://localhost:8010/api/jobproposals/customer/${id}`).then(res =>{
               setCount(res.data);
                console.log(res.data);
            });
     },[id]);

    let number=0;
    if(count.length >0){
        number=count[0].count;
    }

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
                    <div className="profile-newoffers">You have  {number} { number > 1 ? "offers" : "offer"} for your posts.</div>
                    <div className="profile-button">
                        <button>CLICK TO SEE</button>
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