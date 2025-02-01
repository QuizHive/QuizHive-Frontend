import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ToggleModeButton from './components/ToggleModeButton';
import LogoutButton from './components/LogoutButton';
import Shapes from './MainMenu/Shapes'
import api from "../utils/axios";

const MainMenu = () => {
    const [score, setScore] = useState(null);
    const [isPlayer, setIsPlayer] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/users/me')
            .then(response => {
                const userInfo = response.data;
                setScore(userInfo.score);
                setIsPlayer(userInfo.role !== 'admin');
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    }, []);

    const handleLogout = () => {
        navigate('/signin-signup');
    };

    return (
        <div className={document.body.classList.contains('dark-mode') ? "dark-mode" : "light-mode"}>
            <LogoutButton onLogout={handleLogout} />
            <ToggleModeButton />
            <Shapes />
            {isPlayer ? (
                <div>
                    <div className="score-display">
                        Score: {score !== null ? score : 'Loading...'}
                    </div>
                    <div className="message-box">
                        <h1>Welcome Player</h1>
                        <div className="buttons-con">
                            <div className="action-link-wrap">
                                <Link to="/questions">Question Management</Link>
                                <Link to="/leaderboard">Leaderboard</Link>
                                <Link to="/feed">Feed</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="message-box">
                    <h1>Welcome</h1>
                    <div className="buttons-con">
                        <div className="action-link-wrap">
                            <Link to="/question-management">Question Management</Link>
                            <Link to="/category">Category Management</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainMenu;
