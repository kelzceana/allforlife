import React from "react";

import { Link } from "react-router-dom";
import "./Header.css";


const logout = () => {
  localStorage.removeItem("token")
}

export default function Header(props) {
  const {user,setUser } = props;
  console.log(user, "hello user")
    return (
      <nav className="nav-container">
          <div className="nav-div-image">
            <img src="./images/logo.png" />
          </div>
         {!user && <div className="nav-links">
            <Link to="/login" className="nav-link-id">Login</Link> 
            <Link to="/register" className="nav-link-id">Register</Link>
          </div>
          }
          {user && <div className="nav-links">
            <span className="nav-link-id"> Hi {user.user.userName}</span>
            <span className="nav-link-id" onClick={() => setUser(null)}>Logout</span>
          </div>
          }
      </nav>
    );
}

