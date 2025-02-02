import React, {useEffect, useState} from 'react'; // Add useState import
import './GoogleLoginBtn.css';
import {useNavigate} from "react-router-dom";
import api from "../../utils/axios";
import {setAccessToken, setRefreshToken} from "../../utils/auth";
import '../../google.svg'

const GoogleLoginButton = () => {
    let state = false;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Move useState here

    useEffect(() => {
        async function handle() {
            if(state) return;
            console.log("handle...")
            const codeRegex = /code=([^&]+)/;
            const isMatch = window.location.href.match(codeRegex);
            
            if (isMatch) {
                state = true;
                setIsLoading(true);
                console.log("isMatch...: " + window.location.href);
                return api.get('/auth/google?code=' + isMatch[1]).finally(() => setIsLoading(false));
            }
            else return undefined;
        }
        if(state) return;
        handle().then(res => {
            if(res === undefined) return;
            if (res.status === 200) {
                console.log('Google login successful');
                state = false;
                if(res.data.refreshToken && res.data.accessToken) {
                    setAccessToken(res.data.accessToken);
                    setRefreshToken(res.data.refreshToken);
                    navigate('/main-menu');
                }
            } else {
                alert(res.data.error || 'Signup failed');
                state = false;
                navigate('/');
            }
        }).catch(error => {
            console.error('Error signing up:', error);
            alert('An error occurred during signup');
            state = false;
            navigate('/');
        });
    }, [navigate]);

    const login = async () => {
        setIsLoading(true); // Set loading when login starts
        const callbackUrl = `${window.location.origin}`;
        const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        window.location.href = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;
    };
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner-circle"></div>
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    return (
        <button className="google-login-btn" onClick={login}>
            <img src={require('../../google.svg').default} alt="Google Icon" className="uil uil-google google-icon" />
            <span className="google-login-text">Log in with Google</span>
        </button>
    );
};

export default GoogleLoginButton;
