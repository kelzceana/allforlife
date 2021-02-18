import React from "react";
import { useState } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { decodeUser } from "../../util/index";

export default function ProviderLogin(props) {

    const [formValues, setFormValues] = useState({
        userName: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormValues({ ...formValues, [name]: value })
    }

    const fetchUser = () => {
        if(formValues.name === "" || formValues.password === "") {
            setError("userName or password cannot be blank !")
        } else {
            axios.post(`http://localhost:8010/api/providers/login`,
             { userName : formValues.userName, password :formValues.password}).then(res =>{
                if(res.status === 200) {
                    localStorage.setItem("token",res.data.token);
                    const providerData = decodeUser();
                    setError("");
                    props.setUser(providerData.user);
                    
                }
            })
            .catch(err =>{
                setError("User doesn't exist or password is incorrect");
            })   
        }
    }

    return !props.user?(
        <div className="login-container">
            <div className="login">  
                <form className="login-form" onSubmit={event => event.preventDefault()} >
                    <h2>PROVIDER LOGIN</h2>
                    {error && <div className="alert-error">
                    {error}
                    </div>}
                    <h3>Username:</h3>
                    <input type="text" name="userName" value ={formValues.userName} onChange = {handleChange}  placeholder="Username"/>
                    <h3>Password:</h3>
                    <input type="password" name="password" value= {formValues.password} onChange = {handleChange}  placeholder="Password"/>
                    <br/>
                    <input type="submit" value="LOGIN" onClick={fetchUser} className="login-button"/>
                    <br />
                    <Link to='/register/provider' style={{margin:'1em'}}>Click Here to Register</Link>
                </form>
            </div>
        </div>
    ): <Redirect to='/provider/dashboard'></Redirect>;
}