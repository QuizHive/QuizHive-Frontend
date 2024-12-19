import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/leaderboard.css';
import LogoutButton from './components/LogoutButton';
import ToggleModeButton from "./components/ToggleModeButton";
import api from "../utils/axios";

function Leaderboard() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/users/leaderboard')
            .then(response => {
                setData(response.data.scoreboard || []);
            })
            .catch(error => {
                console.error('Error fetching leaderboard data:', error);
            });
    }, []);

    const handleLogout = () => {
        navigate('/main-menu');
    };

    const rows = data.slice(0, 10).map((user, index) => {
        const { id, earnings } = user;
        return (
            <li key={index}>
                <img
                    src={`http://www.rewards1.com/uploads/avatar/${id}.jpg`}
                    onError={e => e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
                    alt={`${user.nickname}'s avatar`}
                />
                <mark>{user.nickname}</mark>
                <small>{user.score !== undefined ? user.score.toFixed(2) : '0.00'}</small>
            </li>
        );
    });

    return (
        <div>
            <LogoutButton onLogout={handleLogout} buttonText="Back" />
            <ToggleModeButton />
            <div className="leaderboard">
                <h1>Leaderboard</h1>
                <div>{rows}</div>
            </div>
        </div>
    );
}

export default Leaderboard;
