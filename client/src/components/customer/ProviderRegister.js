import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { decodeUser } from "../../util/index";

//importing select
import Select from '../PostAd/Select';


//constant values for select
const country = ['United States', 'Canada'];
const ethnicity = ['Africian-Americian','Asian','Hispanic and Latino','Native American'];
const therapy=["Acceptance and Commitment (ACT)","Adlerian","Art Therapy", 
"Attachment-based", "Biofeedback", "Coaching"];
const age=["Adolescents/ Teenagers (14 to 19)", "Adults", "children (6 to 10)", "Elders(65+)"]



export default function Register(props) {

    const [formValues, setFormValues] = useState({
        prefix:"",
        firstName:"",
        lastName:"",
        email: "",
        userName:"",
        password: "",
        degree:"",
        aboutMe:"",
        therapy:"",
        age:"",
        ethnicity:"",
        location:"",
        profile_photo_url:""
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
                password: formValues.password,
                degree:formValues.degree,
                aboutMe:formValues.aboutMe,
                therapy:formValues.therapy,
                age:formValues.age,
                ethnicity:formValues.ethnicity,
                location:formValues.location,
                profile_photo_url:formValues.profile_photo_url
            }
            axios.post(`http://localhost:8010/api/providers/register`,user).then(res =>{
                if(res.status === 200){
                    localStorage.setItem("token",res.data.token);
                    const providerData = decodeUser();
                    setError("");
                    props.setUser(providerData.user);
                    setLoggedIn(true);
                } 
             })
             .catch(err => {
                setError("User already exists!");
             });

        } 
    }

    return !loggedIn ? (
        <div className="register-container">
            <div className="register">
                <form className="register-form" onSubmit={event => event.preventDefault()} >
                    <h2>CREATE NEW PROVIDER ACCOUNT</h2>
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
                    <h3>Degree:</h3>
                    <input type="text" name="degree" value={formValues.degree} onChange = {handleChange}/>
                    <h3>About Me:</h3>
                    <textarea name="aboutMe" value={formValues.aboutMe} onChange = {handleChange} style={{height:5+'rem',width:80+"%"}}/>
                    <h3>Therapy:</h3>
                    <Select listArray={therapy} name='therapy' value={formValues.therapy} handleChange={handleChange}/>
                    <h3>Age:</h3>
                    <Select listArray={age} name='age' value={formValues.age} handleChange={handleChange}/>
                    <h3>Ethnicity:</h3>
                    <Select listArray={ethnicity} name='ethnicity' value={formValues.ethnicity} handleChange={handleChange}/>
                    <h3>Location:</h3>
                    <Select listArray={country} name='location' value={formValues.location} handleChange={handleChange}/>
                    <h3>Profile Photo</h3>
                    <input type="file" name="profile_photo_url" value={formValues.profile_photo_url} onChange = {handleChange}/>
                    <br/>
                    <input type="submit" value="CREATE NEW ACCOUNT" onClick={createUser} className="register-button"/>
                </form>
            </div>       
        </div>
    ):<Redirect to='/'></Redirect>;
    
}