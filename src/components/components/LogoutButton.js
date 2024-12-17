import React from 'react';
import { useNavigate } from 'react-router-dom';
import './logoutButton.css';

const LogoutButton = ({ onLogout, buttonText = "Logout" }) => { // افزودن props برای متن دکمه
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
            {buttonText} {/* استفاده از متن دکمه‌ای که به عنوان prop ارسال می‌شود */}
        </button>
    );
};

export default LogoutButton;
