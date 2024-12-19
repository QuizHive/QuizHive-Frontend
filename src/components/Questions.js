import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionCard from './Questions/QuestionCard';
import Filter from './Questions/Filter';
import LogoutButton from "./components/LogoutButton";
import ToggleModeButton from "./components/ToggleModeButton";
import api from "../utils/axios";
import '../styles/questions.css';

const Questions = () => {
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [openedAccordion, setOpenedAccordion] = useState(null);
    const [questionsData, setQuestionsData] = useState([]);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/main-menu');
    };

    const handleAccordionClick = (index) => {
        setOpenedAccordion(openedAccordion === index ? null : index);
    };

    useEffect(() => {
        api.get('/questions')
            .then(response => {
                setQuestionsData(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });

        api.get('/questions/categories')
            .then(response => {
                const categoryData = response.data.map(category => ({
                    id: category._id,
                    name: category.categoryName,
                }));
                setCategories(categoryData);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);
    const difficultyMap = {
        1: 'easy',
        2: 'normal',
        3: 'hard'
    };

    const applyFilters = (difficulty, category) => {
        return questionsData.filter(question => {
            const matchesDifficulty = difficulty === 'all' || difficultyMap[question.difficulty] === difficulty.toLowerCase();
            const matchesCategory = category === 'all' || question.category.categoryName === category;
            const hasUserAnswer = question.lastChoiceByUser != null;
            return matchesDifficulty && matchesCategory && hasUserAnswer;
        });
    };

    const filteredQuestions = applyFilters(difficultyFilter, categoryFilter);

    return (
        <>
            <LogoutButton onLogout={handleBack} buttonText="Back" />
            <ToggleModeButton />
            <main className="card">
                <h2 className="title">Question Management</h2>
                <Filter
                    difficultyFilter={difficultyFilter}
                    setDifficultyFilter={setDifficultyFilter}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    categories={categories}
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
        </>
    );
};

export default Questions;
