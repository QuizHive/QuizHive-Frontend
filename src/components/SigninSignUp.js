import React from 'react';
import SigninForm from './SigninSignUp/SigninForm';
import SignupForm from './SigninSignUp/SignupForm';
import ToggleModeButton from './components/ToggleModeButton';
import './SigninSignUp/styles/signinSignUp.css';

const SigninSignUp = () => {
    return (
        <div className="section">
            <ToggleModeButton/>
            <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
            <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
            <label htmlFor="reg-log"></label>
            <div className="card-3d-wrap mx-auto">
            <div className="card-3d-wrapper">
                    <SigninForm/>
                    <SignupForm/>
                </div>
            </div>
        </div>
    );
};

export default SigninSignUp;

