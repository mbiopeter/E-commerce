import React from 'react'
import './LoginSignup.css'
const LoginSignup = () => {
    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder="Your Name" name="" id="" />
                    <input type="email" placeholder="Email Address" name="" id="" />
                    <input type="password" placeholder="Password" name="" id="" />
                </div>
                <button>Continue</button>
                <p className="loginsignup-login">Already have an accouunt? <span>Login here</span></p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id=''/>
                    <p>By continuing, i agree to use terms of use & privacy policy.loginsignup</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
