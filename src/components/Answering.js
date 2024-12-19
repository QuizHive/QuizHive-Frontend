import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RandomQuestion from './answering/RandomQuestion';
import QuestionAccordion from './answering/QuestionAccordion';
import Filters from './answering/Filters';
import LogoutButton from "./components/LogoutButton";
import ToggleModeButton from "./components/ToggleModeButton";
import '../styles/answering.css';
import api from "../utils/axios";

function Answering() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openIndex, setOpenIndex] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [questionResults, setQuestionResults] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get('/questions')
            .then(response => {
                setQuestions(response.data);
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

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const displayRandomQuestion = () => {
        const difficultyMap = {
            1: 'easy',
            2: 'normal',
            3: 'hard'
        };

        const filteredQuestions = questions.filter(q =>
            (selectedDifficulty === 'all' || difficultyMap[q.difficulty] === selectedDifficulty.toLowerCase()) &&
            (selectedCategory === 'all' || q.category.categoryName === selectedCategory) &&
            (q.lastChoiceByUser == null || q.lastChoiceByUser === undefined)
        );

        if (filteredQuestions.length === 0) return;
        const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
        setCurrentQuestion(filteredQuestions[randomIndex]);
        setResultMessage('');
    };

    const submitRandomAnswer = async (event) => {
        event.preventDefault();
        const selectedOption = Number(event.target.elements['random-answer']?.value);

        if (selectedOption === NaN) {
            setResultMessage('Please select an answer.');
            return;
        }

        try {
            const response = await api.post('questions/submit', {
                questionId: currentQuestion._id,
                choice: selectedOption
            });
            setResultMessage(response.data.isCorrect ? 'Correct! 🎉' : 'Incorrect. Try again! ❌');
        } catch (error) {
            console.error('Error submitting answer:', error);
            setResultMessage('An error occurred while submitting your answer.');
        }
    };


    const handleSubmitAnswer = async (event, question, index) => {
        event.preventDefault();
        const selectedAnswer = userAnswers[index];
        try {
            const response = await api.post('/questions/submit', {
                questionId: question._id,
                choice: selectedAnswer
            });
            const result = response.data.isCorrect ? 'Correct! 🎉' : 'Incorrect. Try again! ❌';
            setQuestionResults({
                ...questionResults,
                [index]: result
            });
        } catch (error) {
            console.error('Error submitting answer:', error);
            setQuestionResults({
                ...questionResults,
                [index]: 'An error occurred while submitting your answer.'
            });
        }
    };

    const handleLogout = () => {
        navigate('/questions');
    };

    const difficultyMap = {
        1: 'easy',
        2: 'normal',
        3: 'hard'
    };

    const filteredQuestions = questions.filter(q =>
        (selectedDifficulty === 'all' || difficultyMap[q.difficulty] === selectedDifficulty.toLowerCase()) &&
        (selectedCategory === 'all' || q.category.categoryName === selectedCategory) &&
        (q.lastChoiceByUser == null || q.lastChoiceByUser === undefined)
    );


    return (
        <div>
            <LogoutButton onLogout={handleLogout} buttonText="Back" />
            <ToggleModeButton />
            <main className="card">
                <h2 className="title">Question Management</h2>
                <Link to="/questions" className="btn random-btn">List of answered questions</Link>

                <RandomQuestion
                    currentQuestion={currentQuestion}
                    displayRandomQuestion={displayRandomQuestion}
                    submitRandomAnswer={submitRandomAnswer}
                    resultMessage={resultMessage}
                />

                <Filters
                    selectedDifficulty={selectedDifficulty}
                    setSelectedDifficulty={setSelectedDifficulty}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                />

                {filteredQuestions.map((question, index) => (
                    <QuestionAccordion
                        key={index}
                        question={question}
                        index={index}
                        openIndex={openIndex}
                        toggleAccordion={toggleAccordion}
                        handleSubmitAnswer={handleSubmitAnswer}
                        userAnswers={userAnswers}
                        setUserAnswers={setUserAnswers}
                        questionResults={questionResults}
                    />
                ))}
            </main>
        </div>
    );
}

export default Answering;
