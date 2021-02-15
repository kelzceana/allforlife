import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import ProviderLogin from './customer/ProviderLogin';
import ProviderRegister from './customer/ProviderRegister';
import Login from './customer/Login';
import Register from './customer/Register';
import PostAd from './PostAd';
import LoginDecision from './LoginDecision';
import RegisterDecision from './RegisterDecision';

import {decodeUser} from '../util/index'
/*  <>
   <Header />
   {!user && <Register setUser={setUser}/>}
   {user && <h1>Hi {user.username} !</h1>}
   </> */

function App() {
 const userFromStorage = decodeUser()
 const [loggeduser,setUser]= useState(userFromStorage);
  
 //authenticating a user
 
  return (
    <Router>
      <Header user={loggeduser} setUser={setUser}/>
      <Switch>
      <Route path="/providerlogin" exact>
         <ProviderLogin setUser={setUser} /> 
        </Route>
        <Route path="/providerregister" exact>
          <ProviderRegister user={loggeduser} setUser={setUser} />
        </Route>
        <Route path="/customerlogin">
          <Login setUser={setUser} /> 
        </Route>
        <Route path="/customerregister">
         <Register setUser={setUser} />
        </Route>
        <Route path="/register">
          {<RegisterDecision setUser={setUser} />}
        </Route>
        <Route path="/login">
          {<LoginDecision setUser={setUser} />}
        </Route>
        <Route path="/" exact>
          {loggeduser && <PostAd  user={loggeduser}/>}
        </Route>
      </Switch>
      <Footer />
    </Router>
  
  );
}

export default App;
