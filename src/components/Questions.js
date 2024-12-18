// src/components/Questions.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from './Questions/QuestionCard';
import Filter from './Questions/Filter';
import LogoutButton from "./components/LogoutButton";
import ToggleModeButton from "./components/ToggleModeButton";

const Questions = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [openedAccordion, setOpenedAccordion] = useState(null);
    const [questionsData, setQuestionsData] = useState([]);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/main-menu');
    };

    const handleAccordionClick = (index) => {
        setOpenedAccordion(openedAccordion === index ? null : index);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_PREFIX}/questions`)
            .then(response => {
                setQuestionsData(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    const applyFilters = (difficulty, category) => {
        return questionsData.filter(question => {
            const matchesDifficulty = difficulty === 'all' || question.difficulty === difficulty;
            const matchesCategory = category === 'all' || question.category === category;
            return matchesDifficulty && matchesCategory;
        });
    };

    const filteredQuestions = applyFilters(difficultyFilter, categoryFilter);

    return (
        <div className={isDarkMode ? 'dark-mode-q' : 'light-mode-q'}>
            <LogoutButton onLogout={handleBack} buttonText="Back" />
            <ToggleModeButton />
            <main className="card">
                <h2 className="title">Question Management</h2>
                <Filter
                    difficultyFilter={difficultyFilter}
                    setDifficultyFilter={setDifficultyFilter}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                />
                <Link to="/answering" className="btn random-btn">Answer New Question</Link>
                {filteredQuestions.map((question, index) => (
                    <QuestionCard
                        key={index}
                        index={index}
                        question={question}
                        openedAccordion={openedAccordion}
                        onAccordionClick={handleAccordionClick}
                    />
                ))}
            </main>
        </div>
    );
};

export default Questions;
