import "./ProposalForm.css";
import {useEffect, useState, useRef} from "react";
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import axios from "axios";
import ProposalItem from "./ProposalItem";
import { useHistory } from 'react-router-dom';

const ENDPOINT = 'http://localhost:8010'



export default function ProposalForm(props){
    console.log(props.user.id, "props.user1")
    const socketRef = useRef();
    

    const { id } = useParams();
    const [jobe,setJobe] = useState([]);
    const [error, setError] = useState("");
    let history = useHistory();

    const [state, setState]=useState({
        providerId :props.user.id,
        jobPostingId :id,
        description : "",
        price : "",
        availabilityDays : [],
        availabilityFrom : "",
        availabilityTo : ""
    });
    //read the text fields 
    const handleChange = (event) => {
        const { name, value } = event.target
        setState({ ...state, [name]: value })
    } 

    // read the select with muliple selections
    const handleChangeSelect = (e) => {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setState({ ...state, availabilityDays : value })
      }

    useEffect(()=>{
    axios.get(`http://localhost:8010/api/jobpost/${id}`).then(res =>{
            setJobe(res.data[0]);
        });
    },[]);

    function AddProposal(){
        
        if(state.description && state.price && state.availabilityDays && state.availabilityFrom &&
            state.availabilityTo){
            axios.post(`http://localhost:8010/api/jobproposals`,state).then(res =>{
                socketRef.current = io.connect(ENDPOINT);
                socketRef.current.emit('notification', "form submitted");
                console.log(res.data, "proposal form");
                setError("");
                history.push('/provider/dashboard');
            });
        } else {
            setError("Please fill all the fields !");
        }
    }

    return(
        <>
        { jobe && (
        <section className="proposalform-container">
            
            <div className="proposalform-container-title">Make an Offer for: </div>
            <div className="proposalform-separation"> </div>
            <div className="proposalform-item"> 
               <ProposalItem id={id} {...jobe} />
            </div>
            <div className="proposalform-form">
                <h3>Description <span className="yellow-icon">◣</span></h3>
                <textarea name ="description" value={state.description} onChange={handleChange}></textarea>
                <h3>Price (unit) <span className="yellow-icon">◣</span></h3>
                <input type="number" name="price" value={state.price} onChange={handleChange} placeholder="$00.00"/>
                <h3>Availability <span className="yellow-icon">◣</span></h3>
                <div className="form-availabilty">
                   <div className="form-availabilty-da">
                    <h5>Days :</h5>
                    <select name="availabilityDays" onChange={handleChangeSelect} multiple > 
                        <option value=""> </option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                    </select>
                    use (Shift) for multiple selections
                    </div>
                    <div className="form-availabilty-time">
                    <h5>Time :</h5>
                    <input type="text" name="availabilityFrom" value={state.availabilityFrom} onChange={handleChange}/><strong>  / </strong>
                    <input type="text" name="availabilityTo" value={state.availabilityTo} onChange={handleChange}/>  
                    </div>
                   
                </div>
                {error && <div className="alert-error">
                    {error}
                    </div>}
                <div className="button-send">
                   <button onClick={() => AddProposal()}>SEND</button>
                </div>
            </div> 
        </section>)}
        </>
    )
}