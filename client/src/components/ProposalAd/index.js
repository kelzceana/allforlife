
import "./ProposalAd.css";
import axios from "axios";
import { FaWifi } from 'react-icons/fa';

import Filter from "./Filter";
import filterData from "./FilterData";
import ProposalItem from "./ProposalItem";
import { useEffect, useState } from "react";


export default function ProposalAd(props){

    //set the filter with an empty array.
    const[filter,setFilter] = useState([null,0,0,0,0,"DESC"]);
    const [jobesPostingData, setJobPostingData]= useState([]);
    

    // load the jobs posting from api witha specific filter
    useEffect(() => {
      axios.get(`http://localhost:8010/api/jobpost`,{ params :{filter:filter}}).then(res =>{
        console.log(res.data);
        setJobPostingData(res.data);
      });      
  
    },[filter]);

    //helper function that unchecked others checkboxs within the same group
    function unchecked(checkboxName, event) {
        let checkboxes = document.getElementsByName(checkboxName);
        checkboxes.forEach((item) => {
          if (item.value !== event.target.value) {
            item.checked = false;
          } 
        });
    }
    
    // adding filters
    const handleChange = (event) => {
      const { name, value } = event.target;
      const newFilter=[...filter];

      if(name === "order") {
          newFilter[5] = value;
      }
    //set the filter to null of the checkbox uncheked
      if(!event.target.checked){ 
        if(name==="jobType"){
            newFilter[0]=null;
        }
        if(name==="numberOfProposals"){
            newFilter[1]=0;
            newFilter[2]=0;
        }
        if(name==="budget"){
            newFilter[3]=0;
            newFilter[4]=0;
        }
      }

    //set the filter to the value of the checkbox checked
      if(event.target.checked){ 

        if(name==="jobType"){
            newFilter[0]=value;
            unchecked("jobType", event)
        }
        if(name==="numberOfProposals"){
          if(value=== "Less than 5"){
            newFilter[1]=0;
            newFilter[2]=5;
          }
          if(value=== "Less than 5"){
            newFilter[1]=0;
            newFilter[2]=5;
          }
          if(value=== "5 to 10"){
            newFilter[1]=5;
            newFilter[2]=10;
          }
          if(value=== "10 to 15"){
            newFilter[1]=10;
            newFilter[2]=15;
          }
          if(value=== "15 to 20"){
            newFilter[1]=15;
            newFilter[2]=20;
          }
          if(value=== "20 to 50"){
            newFilter[1]=20;
            newFilter[2]=50;
          }
          unchecked("numberOfProposals", event)
        }
        if(name==="budget"){
          if(value==="Less than $100"){
            newFilter[3]=0;
            newFilter[4]=100;}
            if(value==="$100-$500"){
            newFilter[3]=100;
            newFilter[4]=500;}
            if(value==="$500-$1k"){
            newFilter[3]=500;
            newFilter[4]=1000;}
            if(value==="$1k-$5k"){
            newFilter[3]=1000;
            newFilter[4]=5000;}
            if(value==="$5k+"){
            newFilter[3]=5000;
            newFilter[4]=10000;
            }
            unchecked("budget", event)
        }
      }

      setFilter([...newFilter]);
    } 
  

    return(
        <>
       <section className="proposalad-container">
          <aside className= "proposalad-filter">
              <h3>Filter By</h3> 
              <Filter title="Jobe Type" name="jobType" onChange={handleChange} list={filterData.jobType} />
              <Filter title="Number of Proposals"  onChange={handleChange} name='numberOfProposals' list={filterData.numberOfProposals}/>
              <Filter title="Budget"  name= "budget" onChange={handleChange} list={filterData.budget}/>
          </aside> 
        
          <section className="proposalad-list">
              <div className="proposalad-list-header">
                  <div className="proposalad-list-header-counter">
                    <FaWifi style= { {color: "#f5c107", fontSize: "1.5em", transform: "rotate(45deg)"}}/> 
                    <div className="counter"><strong>{jobesPostingData.length}</strong> jobs found </div> 
                  </div>
                  <div className="proposalad-list-header-filter">
                     <span> Sort:</span>
                     <select name="order" onChange={handleChange}>
                          <option value="DESC">Newest</option>
                          <option value="ASC">Oldest</option>
                      </select>
                  </div>
                 </div> 

                 {jobesPostingData.map(job=>{
                   return(
                    <ProposalItem  key ={job.id} {...job} providerId={props.providerId} providerUsername={props.providerUsername}/>
                   )
                 })}
                 <div className="proposal-footer"></div>
          </section> 
        </section>
      
        </>  )
}