import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../../features/user/userActions'
import Logo from "../../img/logos/png/logowhite.png"

import "./Auth.css"

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [FormData, setFormData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmpassword:""
    })
    const [confirmPass, setConfirmPass] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {userInfo} = useSelector(
        (state)=>state.user
    )

    useEffect(() => {
       if (userInfo) navigate("/home")
    }, [userInfo])
    

    const handleChange = (e) => { 
        setFormData({
            ...FormData, [e.target.name]: e.target.value
        })  
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(isSignUp)
        // If signUp is false means that that we have not sign in
        if (!isSignUp) {
            // console.log("sign in page")
            FormData.password === FormData.confirmpassword ? dispatch(registerUser(FormData)):
                setConfirmPass(false)
            setIsSignUp(true)
        }
        else {
            dispatch(loginUser(FormData))
        }
    }
    const resetForm = () => {
        setConfirmPass(true);
        setFormData({username: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmpassword:""})
    }

  return (
    <div className='Auth'>
        {/* LeftSide */}
        <div className="a-left">
            <img src={Logo} alt="" />
            <div className="WebName">
                <h1>Curious Nerds</h1>
                <h6>Join the Curious Minds</h6>
            </div>
        </div>    
        {/* RightSide */}
        <div className="form">
            <div className="a-right">
            <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>  {isSignUp ? "Log in " : "Sign up"}</h3>
                    { !isSignUp && 
                <div >
                    <input onChange={handleChange} value = {FormData.firstname} type="text" placeholder='First Name' className='infoInput' name='firstname' />
                    <input onChange={handleChange} value = {FormData.lastname} type="text" placeholder='Last Name' className='infoInput' name='lastname' />
                </div>}
                <div>
                    <input onChange={handleChange} value = {FormData.username} type="text" className='infoInput' name='username' placeholder='username' />
                </div>
                <div>
                    <input onChange={handleChange} value = {FormData.password} type="password" className='infoInput' name='password' placeholder='password' />
                    {
                        !isSignUp &&
                        <input onChange={handleChange} value = {FormData.confirmpassword} type="password" className='infoInput' name='confirmpassword' placeholder='confirm password' />
                    }
                </div>
                <span
                    style={{
                        display: confirmPass ? "none" : "block",
                        color: "red",
                        fontSize: "12px",
                        alignSelf: "flex-end",
                        marginRight:"5px"
                    }} 
                > *Confirm Password is not same
                </span>
                    <span style={{ fontSize: "12px", cursor: "pointer" }} onClick={() => { setIsSignUp((prev) => !prev);  resetForm()}} > {!isSignUp ? "Already have an account. Login!" : "Don't have an account ? Sign up "}</span>
            <button className="button infoButton" type='submit' > {isSignUp ? "Log in " : "Sign up"}</button>
            </form>
        </div>
        </div>
</div>
    )
    
    
}
