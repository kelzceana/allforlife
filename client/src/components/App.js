import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

import Login from './customer/Login';
import Register from './customer/Register';
import PostAd from './PostAd';
import LoginDecision from './LoginDecision';
import RegisterDecision from './RegisterDecision';

/*  <>
   <Header />
   {!user && <Register setUser={setUser}/>}
   {user && <h1>Hi {user.username} !</h1>}
   </> */

function App() {
  const [user,setUser]= useState(null);

  return (
    <Router>
      <Header user={user} setUser={setUser}/>
      <Switch>
        <Route path="/customerlogin">
          <Login setUser={setUser} /> 
        </Route>
        <Route path="/customerregister">
          <Register setUser={setUser} />
        </Route>
        <Route path="/register">
          {!user && <RegisterDecision setUser={setUser} />}
        </Route>
        <Route path="/login">
          {!user && <LoginDecision setUser={setUser} />}
        </Route>
        <Route path="/" exact>
          <PostAd  user={user}/>
        </Route>
      </Switch>
      <Footer />
    </Router>
  
  ); 
}

export default App;