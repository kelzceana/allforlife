import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FcHome } from "react-icons/fc"
import "./Header.css";

export default function Header(props) {

  //local variable to use history method
  let history = useHistory();
  
  const { user,setUser } = props;
  const handleClick =(event) => {
    event.preventDefault();
    localStorage.setItem("token", "");
    setUser(undefined);
    history.push('/');
  }

    return (
      <nav className="nav-container">
         <div className="nav-div-image">
            <Link to="/"><img src="/image/logo.png" alt="logo" /></Link>           
          </div>
          <div className="nav-links">
          {user && <div className="nav-links">
            <span className="nav-link-id" onClick={(event) => handleClick(event)}>Logout</span>
          </div>
          }
          { user && 
            <div className="nav-links">
              {user.type === 'customer' ?
              <Link className="nav-link-id" to="/customer/dashboard">DashBoard</Link>:
              <Link className="nav-link-id" to="/provider/dashboard">DashBoard</Link> }
            </div>
          }  
          <div className="nav-home-icon">
            <Link to="/">
              <FcHome  style={{height:'4.5em', 
                width:'2.5em', 
                paddingBottom:'0.3em',
                alignContent:'center'
                }}
              />
            </Link>
          </div>
          </div>
  
      </nav>
    );
}
