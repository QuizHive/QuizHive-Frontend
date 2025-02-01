import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import '../styles/management.css';
import LogoutButton from './components/LogoutButton';
import ToggleModeButton from './components/ToggleModeButton';
import QuestionForm from './questionmanagement/QuestionForm';
import QuestionList from './questionmanagement/QuestionList';

const QuestionManagement = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [existingQuestions, setExistingQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/questions")
            .then(response => {
                setExistingQuestions(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    const addQuestion = (newQuestion) => {
        console.log(newQuestion);
        api.post(`/questions`, newQuestion, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(() => api.get("/questions"))
            .then(response => {
                setExistingQuestions(response.data);
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
        <>
            <LogoutButton onLogout={goBack} buttonText="Back" />
            <ToggleModeButton onToggle={toggleDarkMode} />
            <QuestionForm onAddQuestion={addQuestion} darkMode={darkMode} />
            <QuestionList questions={existingQuestions} darkMode={darkMode} />
        </>
    );
};

export default QuestionManagement;
