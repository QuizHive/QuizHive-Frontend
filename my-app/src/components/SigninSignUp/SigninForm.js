import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/signinForm.css';

const SigninForm = () => {
    const navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const loginEmail = document.getElementById('logemail').value.trim();
        const loginPassword = document.getElementById('logpass').value.trim();

        if (loginEmail && loginPassword) {
            try {
                const response = await axios.post('/api/login', {
                    email: loginEmail,
                    password: loginPassword
                });
                if (response.data.success) {
                    navigate('/main-menu');
                } else {
                    alert(response.data.message || 'Login failed');
                }
            } catch (error) {
                console.error('Error logging in:', error);
                alert('An error occurred during login.');
            }
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <div className="card-front">
            <div className="center-wrap">
                <div className="section text-center">
                    <h4 className="mb-4 pb-3">Log In</h4>
                    <div className="form-group">
                        <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" />
                        <i className="input-icon uil uil-at"></i>
                    </div>
                    <div className="form-group mt-2">
                        <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" />
                        <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <button onClick={handleLoginSubmit} className="btn mt-4 random-btn">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default SigninForm;

