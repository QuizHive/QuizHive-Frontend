import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // اضافه کردن axios
import '../styles/answering.css';
import LogoutButton from "./components/LogoutButton";
import ToggleModeButton from "./components/ToggleModeButton";

function Answering() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]); // لیستی از سوالات مورد نیاز
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openIndex, setOpenIndex] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [questionResults, setQuestionResults] = useState({});

    useEffect(() => {
        // بارگذاری سوالات از بک‌اند
        axios.get('/api/questions')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, []);

    const toggleAccordion = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
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
            const response = await axios.post('/api/submit-answer', {
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
            const response = await axios.post('/api/submit-answer', {
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
            <LogoutButton onLogout={handleLogout} buttonText="Back"/>
            <ToggleModeButton/>
            <main className="card">
                <h2 className="title">Question Management</h2>
                <Link to="/questions" className="btn random-btn">List of answered questions</Link>

                <div className="random-question-section">
                    <h3>Answer a Random Question</h3>
                    <p className="random-question">Click the button to get a random question!</p>
                    <button className="btn random-btn" onClick={displayRandomQuestion}>Get Random Question</button>

                    {currentQuestion && (
                        <form className="random-question-form" onSubmit={submitRandomAnswer}>
                            <h4>{currentQuestion.question}</h4>
                            {currentQuestion.options.map((option, index) => (
                                <div key={index}>
                                    <label>
                                        <input type="radio" name="random-answer" value={option[0]} required /> {option}
                                    </label>
                                </div>
                            ))}
                            <button className="btn random-submit-btn" type="submit">Submit Answer</button>
                            <p className="result-message">{resultMessage}</p>
                        </form>
                    )}
                </div>

                <div className="filter-options">
                    <button className="filter-btn" onClick={() => setSelectedDifficulty('all')}>All</button>
                    <button className="filter-btn" onClick={() => setSelectedDifficulty('easy')}>Easy</button>
                    <button className="filter-btn" onClick={() => setSelectedDifficulty('normal')}>Normal</button>
                    <button className="filter-btn" onClick={() => setSelectedDifficulty('hard')}>Hard</button>

                    <select id="category-select" onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="all">All Categories</option>
                        <option value="general">General</option>
                        <option value="jokes">Jokes</option>
                        <option value="science">Science</option>
                        <option value="animals">Animals</option>
                    </select>
                </div>

                {filteredQuestions.map((question, index) => (
                    <div key={index} className="acc-item">
                        <button className={`acc-btn ${openIndex === index ? 'is-open' : ''}`} onClick={() => toggleAccordion(index)}>
                            <span className="score-icon">⭐</span> {question.difficulty.toUpperCase()}
                            <span className="category"> [{question.category.charAt(0).toUpperCase() + question.category.slice(1)}]</span> {question.question}
                        </button>
                        <div className="acc-content" style={{ maxHeight: openIndex === index ? '1000px' : '0' }}>
                            <form onSubmit={(e) => handleSubmitAnswer(e, question, index)}>
                                {question.options.map((option, idx) => (
                                    <label key={idx}>
                                        <input
                                            type="radio"
                                            name={`answer${index}`}
                                            value={option[0]}
                                            onChange={() => setUserAnswers({ ...userAnswers, [index]: option[0] })}
                                            required
                                        /> {option}
                                    </label>
                                ))}
                                <button className="btn" type="submit">Submit</button>
                                <p className="result-message">{questionResults[index]}</p>
                            </form>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default Answering;
