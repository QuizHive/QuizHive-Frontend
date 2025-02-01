import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/leaderboard.css';
import '../styles/Feed.css';
import LogoutButton from './components/LogoutButton';
import ToggleModeButton from "./components/ToggleModeButton";
import QuestionAccordion from './answering/QuestionAccordion';
import api from "../utils/axios";

function SearchUsers() {
    const [data, setData] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = async (query) => {
        try {
            const response = await api.get(`/users/search?query=${query}`);
            setData(response.data.users || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchQuestions = async () => {
        try {
            const response = await api.get('/questions');
            setQuestions(response.data || []);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        if (searchQuery === '') {
            setData([]);
        } else {
            fetchUsers(searchQuery);
        }
    }, [searchQuery]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleLogout = () => {
        navigate('/main-menu');
    };

    return (
        <div>
            <LogoutButton onLogout={handleLogout} buttonText="Back" />
            <ToggleModeButton />
            <div className="dashboard">
                {/* Right section for search */}
                <div className="search-card">
                    <h1>Search Developers</h1>
                    <input
                        type="text"
                        placeholder="Search Developers by nickname"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <ul>
                        {data.length > 0 ? data.map((user, index) => (
                            <li key={index}>
                                <img
                                    src={`http://www.rewards1.com/uploads/avatar/${user.id}.jpg`}
                                    onError={e => e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
                                    alt={`${user.nickname}'s avatar`}
                                />
                                <mark>{user.nickname}</mark>
                                <small>{user.score !== undefined ? user.score.toFixed(2) : '0.00'}</small>
                            </li>
                        )) : <p>No users found.</p>}
                    </ul>
                </div>

                {/* Left section for questions */}
                <div className="questions-card">
                    <h1>Questions</h1>
                    {questions.map((question, index) => (
                        <QuestionAccordion
                            key={index}
                            question={question}
                            index={index}
                            openIndex={openIndex}
                            toggleAccordion={toggleAccordion}
                            handleSubmitAnswer={() => {}}
                            userAnswers={{}}
                            setUserAnswers={() => {}}
                            questionResults={{}}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default SearchUsers;
