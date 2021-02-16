import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Login from './customer/Login';
import Register from './customer/Register';
import PostAd from './PostAd';
import ProviderLogin from './provider/ProviderLogin';
import ProviderRegister from './provider/ProviderRegister';
import { decodeUser } from '../util/index';
import Home from './Home';
import ProposalForm from "./ProposalAd/ProposalForm";
import CustomerDashboard from './customer/CustomerDashboard';



function App() {
  const userFromStorage = decodeUser()|| {};
  const [loggeduser,setUser]= useState(userFromStorage.user);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Header 
        setLoggedIn={setLoggedIn} 
        user={loggeduser} 
        setUser={setUser}
      />
      <Switch>
        <Route path="/login/provider" exact>
         <ProviderLogin loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} /> 
        </Route>
        <Route path="/register/provider" exact>
          <ProviderRegister loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} />
        </Route>
        <Route path="/login/customer" exact>
          <Login 
            loggedIn={loggedIn} 
            setLoggedIn={setLoggedIn}
            user={loggeduser} 
            setUser={setUser} 
          /> 
        </Route>
        <Route path="/register/customer" exact>
          <Register 
            loggedIn={loggedIn} 
            setLoggedIn={setLoggedIn} 
            setUser={setUser} 
          />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/postAd" exact>
          {(loggeduser && loggeduser.type === "customer") ? <PostAd  user={loggeduser}/> : <Redirect to="/" />} 
        </Route>
        <Route path="/proposalform/:id" exact>
         { (loggeduser && loggeduser.type === "provider") ?
            <ProposalForm user={loggeduser}/> :
            <Redirect to="/login/provider"/> 
          }
        </Route>
        <Route path="/customer/dashboard" exact>
          {(loggeduser && loggeduser.type === "customer") ? <CustomerDashboard user={loggeduser}/> :<Redirect to="/" />}
        </Route>
      </Switch>
      <Footer />
    </Router>
  
  );
}

export default App;