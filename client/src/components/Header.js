import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./Header.css";

export default function Header(props) {
  const { user,setUser } = props;
  const handleClick =(event) => {
    event.preventDefault();
    localStorage.setItem("token", "");
    setUser(undefined);
    props.setLoggedIn(false);
  }

    return (
      <nav className="nav-container">
          <div className="nav-div-image">
            <img src="/image/logo.png" alt="logo" />
          </div>
          {user && <div className="nav-links">
            <span className="nav-link-id"> Hi {user.userName}</span>
            <Link to='/postAd'>PostAd</Link>
            <span className="nav-link-id" onClick={(event) => handleClick(event)}>Logout</span>
          </div>
          }
      </nav>
    );
}
