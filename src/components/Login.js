import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials,setCedentials]=useState({email:"",password:""});
    let history=useNavigate();
    const host=process.env.REACT_APP_BASE_URL
    // const host={host};
    // const host='http://localhost:5000'
    const handleSubmit= async(e) =>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({email: credentials.email,password: credentials.password}),
        });
        const json =await response.json();
        console.log(json);
        if(json.success){
            // save the auth token and redirect 
            localStorage.setItem('token',json.authtoken);
            history("/home");
            props.showAlert("Logged in Successfully","success")
        }
        else{
            props.showAlert("Invalid credentials","Error")
        }
    }
    const onchange=(e)=>{
        setCedentials({...credentials, [e.target.name]:e.target.value})
    }
    return (
        <div className='mt-3'>
        <h2 className=' text-black text-2xl'>Login to PrivyPad</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={credentials.email} onChange={onchange} name ="email" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onchange} id="password" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary text-blue-500">Submit</button>
        </form>
        </div>
    )
}
export default Login
