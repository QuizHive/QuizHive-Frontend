import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/signinForm.css';
import api from "../../utils/axios";

const SignupForm = () => {
    useNavigate();
    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        const signupName = document.getElementById('signupName').value.trim();
        const signupEmail = document.getElementById('signupEmail').value.trim();
        const signupPassword = document.getElementById('signupPassword').value.trim();
        const signupUserType = document.getElementById('userType').value;

        if (signupName && signupEmail && signupPassword && signupUserType) {
            try {
                const response = await api.post('/auth/register', {
                    nickname: signupName,
                    email: signupEmail,
                    password: signupPassword,
                    role: signupUserType
                });
                if (response.status === 200) {
                } else {
                    alert(response.data.error || 'Signup failed');
                }
            } catch (error) {
                console.error('Error signing up:', error);
                alert('An error occurred during signup');
            }
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <div className="card-back">
            <div className="center-wrap">
                <div className="section text-center">
                    <h4 className="mb-4 pb-3">Sign Up</h4>
                    <div className="form-group">
                        <input type="text" name="logname" className="form-style" placeholder="Your Full Name" id="signupName" autoComplete="off" />
                        <i className="input-icon uil uil-user"></i>
                    </div>
                    <div className="form-group mt-2">
                        <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="signupEmail" autoComplete="off" />
                        <i className="input-icon uil uil-at"></i>
                    </div>
                    <div className="form-group mt-2">
                        <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="signupPassword" autoComplete="off" />
                        <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <div className="form-group mt-2">
                        <select name="userType" className="form-style" id="userType" defaultValue="">
                            <option value="" disabled>Select your role</option>
                            <option value="player">Player</option>
                            <option value="admin">Admin</option>
                        </select>
                        <i className="input-icon uil uil-user"></i>
                    </div>
                    <button onClick={handleSignupSubmit} className="btn mt-4 random-btn">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;

