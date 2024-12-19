import React from 'react';
import { useNavigate } from 'react-router-dom';
import './logoutButton.css';

const LogoutButton = ({ onLogout, buttonText = "Logout" }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout();
        }
        else {
            navigate('/signin-signup');
        }
    };

    return (
        <button id="logout-button" onClick={handleLogoutClick}>
            {buttonText}
        </button>
    );
};

export default LogoutButton;
