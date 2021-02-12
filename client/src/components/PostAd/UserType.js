import React from 'react'


export default function UserType(props) {
  return(
    
      <div className="col-md-6 col-lg-4 mb-5">
      <input type="radio" id="male" name="gender" value="male" />
      <div className="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal1">
          <img className="img-fluid" src={`./img/${props.img}.PNG`} alt="user" />
          <h3>{props.type}</h3>
          <p class="text-justify">{props.message}</p>
      </div>
    </div>
    
    
  )
}