import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
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
        axios.get('/api/questions')
            .then(response => {
                setExistingQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    const addQuestion = (newQuestion) => {
        axios.post('/api/questions', newQuestion)
            .then(response => {
                setExistingQuestions([...existingQuestions, response.data]);
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
            <ToggleModeButton />
            <QuestionForm onAddQuestion={addQuestion} darkMode={darkMode} />
            <QuestionList questions={existingQuestions} darkMode={darkMode} />
        </div>
    );
};

export default QuestionManagement;
