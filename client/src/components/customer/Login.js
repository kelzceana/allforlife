import React from "react";
import { useState, useEffect} from "react";
import axios from "axios";
import "./Login.css";
<<<<<<< HEAD
import { Redirect } from "react-router-dom";
=======
>>>>>>> 9c718e73a37e0c31af401e6fcd16c41f434d300d


export default function Login(props) {

    const [formValues, setFormValues] = useState({
<<<<<<< HEAD
        userName: "",
=======
        email: "",
>>>>>>> 9c718e73a37e0c31af401e6fcd16c41f434d300d
        password: ""
    });
    const [error, setError] = useState("");

    const [loggedIn, setLoggedIn] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormValues({ ...formValues, [name]: value })
    }

    const fetchUser = () => {
        if(formValues.name === "" || formValues.password === "") {
<<<<<<< HEAD
            setError("userName or password cannot be blank !")
        } else {
            axios.post(`http://localhost:8010/api/login`,
             { userName : formValues.userName, password :formValues.password}).then(res =>{
                if(res.data.length <= 0){
                    setError("userName or password is incorrect !")
                    } else {
                        setError("");
                        console.log(res.data)
=======
            setError("Email or password cannot be blank !")
        } else {
            axios.post(`http://localhost:8010/api/login`,
             { email : formValues.email, password :formValues.password}).then(res =>{
                if(res.data.length <= 0){
                    setError("Email or password is incorrect !")
                    } else {
                        setError("");
>>>>>>> 9c718e73a37e0c31af401e6fcd16c41f434d300d
                        props.setUser(res.data)
                        setLoggedIn(true);
                } 
            });      
        }
    }

<<<<<<< HEAD
    return !loggedIn ?(
=======
    return (
>>>>>>> 9c718e73a37e0c31af401e6fcd16c41f434d300d
        <div className="login-container">
            <div className="login">  
                <form className="login-form" onSubmit={event => event.preventDefault()} >
                    <h2>CUSTOMER LOGIN</h2>
                    {error && <div className="alert-error">
                    {error}
                    </div>}
<<<<<<< HEAD
                    <h3>Username:</h3>
                    <input type="text" name="userName" value ={formValues.userName} onChange = {handleChange}  placeholder="Username"/>
=======
                    <h3>Email:</h3>
                    <input type="text" name="email" value ={formValues.email} onChange = {handleChange}  placeholder="Email"/>
>>>>>>> 9c718e73a37e0c31af401e6fcd16c41f434d300d
                    <h3>Password:</h3>
                    <input type="password" name="password" value= {formValues.password} onChange = {handleChange}  placeholder="Password"/>
                    <br/>
                    <input type="submit" value="LOGIN" onClick={fetchUser} className="login-button"/>
                </form>
            </div>
        </div>
<<<<<<< HEAD
    ): <Redirect to='/'></Redirect>;
}
=======
    )
    
}
>>>>>>> 9c718e73a37e0c31af401e6fcd16c41f434d300d
