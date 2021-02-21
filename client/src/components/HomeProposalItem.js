import "./Home.css";
import axios from "axios";
import React, { useState, useEffect } from 'react'
import Follower from './Follower'



export default function HomeProposalItem(props){
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState([])


  const[filter,setFilter] = useState([null,0,0,0,0,"DESC"]);
  // load the jobs posting from api with a specific filter
  useEffect(() => {
        axios.get(`http://localhost:8010/api/jobpost`,{ params :{filter:filter}}).then(res =>{
          setData(paginate(res.data));
          setLoading(false)
        });      
    
      },[]);
  useEffect(() => {
    if (loading) return
      setFollowers(data[page])
  }, [loading, page])
    
      const nextPage = () => {
        setPage((oldPage) => {
          let nextPage = oldPage + 1
          if (nextPage > data.length - 1) {
            nextPage = 0
          }
          return nextPage
        })
      }
      const prevPage = () => {
        setPage((oldPage) => {
          let prevPage = oldPage - 1
          if (prevPage < 0) {
            prevPage = data.length - 1
          }
          return prevPage
        })
      }
    
      const handlePage = (index) => {
        setPage(index)
      }

      const paginate = (followers) => {
        const itemsPerPage = 2
        const numberOfPages = Math.ceil(followers.length / itemsPerPage)
      
        const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
          const start = index * itemsPerPage
          return followers.slice(start, start + itemsPerPage)
        })
      
        return newFollowers
      }
    
      return (
        <main>
          <section className='followers'>
            <div className='followers-container'>
              {followers.map((follower) => {
                return <Follower key={follower.id} {...follower} />
              })}
            </div>
              <div className='followers-btn-container'>
                <button className='followers-prev-btn' onClick={prevPage}>
                  prev
                </button>
                {data.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={`followers-page-btn ${index === page ? 'followers-active-btn' : null}`}
                      onClick={() => handlePage(index)}
                    >
                     <span> ● </span>
                    </button>
                  )
                })}
                <button className='followers-next-btn' onClick={nextPage}>
                  next
                </button>
              </div>
          </section>
        </main>
      )
}