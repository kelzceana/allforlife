import React, { useState } from "react";
import axios from "axios";
import "./Register.css"
import { Redirect } from "react-router-dom";
import { decodeUser } from '../../util/index';

export default function Register(props) {

    const [formValues, setFormValues] = useState({
        prefix:"",
        firstName:"",
        lastName:"",
        email: "",
        userName:"",
        password: ""
    });
    const [error, setError] = useState("");

    const [loggedIn, setLoggedIn] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormValues({ ...formValues, [name]: value })
    }

    const createUser = () => {
        if(formValues.userName === ""||formValues.email === "" || formValues.password==="" || formValues.firstName===""
        || formValues.lastName==="") {
            setError("First name , last name , Username, email and password cannot be blank !")
        } else {
            const user = {
                prefix:formValues.prefix,
                firstName:formValues.firstName,
                lastName:formValues.lastName,
                userName:formValues.userName,
                email: formValues.email,
                password: formValues.password
            }
            axios.post(`http://localhost:8010/api/register`,user).then(res =>{

                if (res.status === 200) {
                    
                     localStorage.setItem("token", res.data.token)
                     const userData = decodeUser()
                     setError("");
                     props.setUser(userData.user)
                     setLoggedIn(true);
                    //console.log(userData.user.id);
                    //  setError("");
                    //  props.setUser(res.data.userName)
                    //  setLoggedIn(true);
                }

                // if(res.data.length <= 0){
                //     setError("Could not create user this username already exists!")
                //     } else {
                //         console.log(res.data);
                //         setError("");
                //         props.setUser(res.data)
                //         setLoggedIn(true);
                //     } 
             });

        } 
    }

    return !loggedIn ? (
        <div className="register-container">
            <div className="register">
                <form className="register-form" onSubmit={event => event.preventDefault()} >
                    <h2>CREATE NEW CUSTOMER ACCOUNT</h2>
                    {error && <div className="alert-error">
                    {error}
                    </div>}
                    <h3>Prefix:</h3>
                    <select name="prefix" value={formValues.prefix} onChange = {handleChange} >
                        <option value=" "> </option>
                        <option value= "Mr">Mr.</option>
                        <option value= "Mrs">Mrs.</option>
                        <option value= "Ms">Ms.</option>
                    </select>
                    <h3>First Name:</h3>
                    <input type="text" name="firstName" value={formValues.firstName} onChange = {handleChange}/>
                    <h3>Last Name:</h3>
                    <input type="text" name="lastName" value={formValues.lastName} onChange = {handleChange}/>
                    <h3>Email:</h3>
                    <input type="email" name="email" value={formValues.email} onChange = {handleChange}/>
                    <h3>Username:</h3>
                    <input type="text" name="userName" value={formValues.userName} onChange = {handleChange}/>
                    <h3>Password:</h3>
                    <input type="password" name="password" value={formValues.password} onChange = {handleChange}/>
                    <br/>
                    <input type="submit" value="CREATE NEW ACCOUNT" onClick={createUser} className="register-button"/>
                </form>
            </div>       
        </div>
    ):<Redirect to='/'></Redirect>;
    
}
