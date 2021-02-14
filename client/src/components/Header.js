import React from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Header.css";


export default function Header(props) {
  
  const handleClick = (evt) => {
    evt.preventDefault();
    localStorage.setItem("token", "");
    props.setUser(undefined);
    <Redirect to='/login'></Redirect>
  }

  console.log(props.user, "props user")
    return (
      <nav className="nav-container">
          <div className="nav-div-image">
            <img src="./images/logo.png" />
          </div>
         {props.user === undefined && <div className="nav-links">
            <Link to="/login" className="nav-link-id">Login</Link> 
            <Link to="/register" className="nav-link-id">Register</Link>
          </div>
          }
          {props.user !== undefined && <div className="nav-links">
            <span className="nav-link-id"> Hi {props.user.userName}</span>
            <span className="nav-link-id" onClick={(evt) => handleClick(evt)}>Logout</span>
          </div>
          }
      </nav>
    );
}

