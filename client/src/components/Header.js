import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header(props) {
  const { user,setUser } = props;

    return (
      <nav className="nav-container">
          <div className="nav-div-image">
            <img src="./image/logo.png" />
          </div>
         {!user && <div className="nav-links">
            <Link to="/login" className="nav-link-id">Login</Link> 
            <Link to="/register" className="nav-link-id">Register</Link>
          </div>
          }
          {user && <div className="nav-links">
            <span className="nav-link-id"> Hi {user.username}</span>
            <span className="nav-link-id" onClick={() => setUser(null)}>Logout</span>
          </div>
          }
      </nav>
    );
}
