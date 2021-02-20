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
import CustomerProposals from './customer/CustomerProposals';
import ProviderDashboard from './provider/ProviderDashboard';
import Join from '../components/Chat/Join'
import Chat from '../components/Chat/Chat'
import MoreInfo from '../components/customer/MoreInfo'



function App() {
  const userFromStorage = decodeUser()|| {};
  const [loggeduser,setUser]= useState(userFromStorage.user);
  

  return (
    <Router>
    <Header user={loggeduser} setUser={setUser}/>
    <Switch>
      <Route path="/login/provider" exact>
       <ProviderLogin user={loggeduser} setUser={setUser} /> 
      </Route>
      <Route path="/register/provider" exact>
        <ProviderRegister user={loggeduser}  setUser={setUser} />
      </Route>
      <Route path="/login/customer" exact>
        <Login user={loggeduser} setUser={setUser} /> 
      </Route>
      <Route path="/register/customer" exact>
        <Register user={loggeduser}  setUser={setUser} />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/postAd" exact>
        {(loggeduser && loggeduser.type === "customer") ? 
         <PostAd  user={loggeduser}/> : 
         <Redirect to="/" />
        } 
      </Route>
      <Route path="/proposalform/:id" exact>
       { (loggeduser && loggeduser.type === "provider") ?
          <ProposalForm user={loggeduser}/> :
          <Redirect to="/login/provider"/> 
        }
      </Route>
      <Route path="/customer/dashboard" exact>
        {(loggeduser && loggeduser.type === "customer") ? 
        <CustomerDashboard user={loggeduser}/> 
        :<Redirect to="/" />}
      </Route>
      <Route path="/customer/proposal" exact>
        {(loggeduser && loggeduser.type === "customer") ? 
        <CustomerProposals user={loggeduser}/> 
        :<Redirect to="/" />}
      </Route>
      <Route path="/provider/dashboard" exact>
        {(loggeduser && loggeduser.type === "provider") ? 
        <ProviderDashboard user={loggeduser}/> 
        :<Redirect to="/" />}
      </Route>
      <Route path='/moreinfo/:id' exact>
          <MoreInfo user={loggeduser} />
        </Route>  
      
      <Route path='/chat'  component={Chat} />
    </Switch>
    <Footer />
  </Router>
  
  );
}

export default App;