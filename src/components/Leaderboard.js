import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // اضافه کردن axios
import '../styles/leaderboard.css';
import LogoutButton from './components/LogoutButton';
import ToggleModeButton from "./components/ToggleModeButton";

function Leaderboard(props) {
    const data = props.data || [];
    const rows = data.slice(0, 10).map((user, index) => {
        const { userId, userName, earnings } = user;
        return (
            <li key={index}>
                <img
                    src={`http://www.rewards1.com/uploads/avatar/${userId}.jpg`}
                    onError={e => e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
                    alt={`${userName}'s avatar`}
                />
                <mark>{userName}</mark>
                <small>{earnings.toFixed(2)}</small>
            </li>
        );
    });

    return (
        <div className="leaderboard">
            <h1>{props.title || 'Leaderboard'}</h1>
            <ol>{rows}</ol>
        </div>
    );
}

function App() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // دریافت داده‌ها از بک‌اند
        axios.get(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_PREFIX}/api/leaderboard`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching leaderboard data:', error);
            });
    }, []);

    const handleLogout = () => {
        navigate('/main-menu');
    };

    return (
        <div>
            <LogoutButton onLogout={handleLogout} buttonText="Back" />
            <ToggleModeButton />
            <Leaderboard title="Leaderboard" data={data} />
        </div>
    );
}

export default App;
