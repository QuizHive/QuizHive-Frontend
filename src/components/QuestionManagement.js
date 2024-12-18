import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios'; // Import the axios instance
import '../styles/management.css';
import LogoutButton from './components/LogoutButton';
import ToggleModeButton from './components/ToggleModeButton';
import QuestionForm from './questionmanagement/QuestionForm';
import QuestionList from './questionmanagement/QuestionList';
import axios from "axios";

const QuestionManagement = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [existingQuestions, setExistingQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Use the axios instance to fetch questions
        axios.get(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_PREFIX}/questions`)
            .then(response => {
                setExistingQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    const addQuestion = (newQuestion) => {
        console.log("www")
        axios.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_PREFIX}/questions`, newQuestion, {
        })
            .then(response => {
                console.log(response)
                setExistingQuestions(prevQuestions => [...prevQuestions, response.data]);
            })
            .catch(error => {
                console.error('Error submitting question:', error);
            });
    };

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    const goBack = () => {
        navigate('/main-menu');
    };

    return (
        <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <LogoutButton onLogout={goBack} buttonText="Back"/>
            <ToggleModeButton onToggle={toggleDarkMode} />
            <QuestionForm onAddQuestion={addQuestion} darkMode={darkMode} />
            <QuestionList questions={existingQuestions} darkMode={darkMode} />
        </div>
    );
};

export default QuestionManagement;
