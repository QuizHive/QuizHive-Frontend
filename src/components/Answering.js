// src/components/Answering.js
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

    useEffect(() => {
        api.get('/questions')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const displayRandomQuestion = () => {
        if (questions.length === 0) return;
        const randomIndex = Math.floor(Math.random() * questions.length);
        setCurrentQuestion(questions[randomIndex]);
        setResultMessage('');
    };

    const submitRandomAnswer = async (event) => {
        event.preventDefault();
        const selectedOption = event.target.elements['random-answer']?.value;

        if (!selectedOption) {
            setResultMessage('Please select an answer.');
            return;
        }

        try {
            const response = await api.post('questions/submit-answer', {
                questionId: currentQuestion.id,
                answer: selectedOption
            });
            setResultMessage(response.data.correct ? 'Correct! 🎉' : 'Incorrect. Try again! ❌');
        } catch (error) {
            console.error('Error submitting answer:', error);
            setResultMessage('An error occurred while submitting your answer.');
        }
    };

    const handleSubmitAnswer = async (event, question, index) => {
        event.preventDefault();
        const selectedAnswer = userAnswers[index];

        if (!selectedAnswer) {
            setQuestionResults({
                ...questionResults,
                [index]: 'Please select an answer.'
            });
            return;
        }

        try {
            const response = await api.post('/questions/submit-answer', {
                questionId: question.id,
                answer: selectedAnswer
            });
            const result = response.data.correct ? 'Correct! 🎉' : 'Incorrect. Try again! ❌';
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

    const filteredQuestions = questions.filter(q =>
        (selectedDifficulty === 'all' || q.difficulty === selectedDifficulty) &&
        (selectedCategory === 'all' || q.category === selectedCategory)
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
