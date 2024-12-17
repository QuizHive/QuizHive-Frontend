// src/components/RandomQuestion.js
import React from 'react';
import './RandomQuestions.css';

const RandomQuestion = ({ currentQuestion, displayRandomQuestion, submitRandomAnswer, resultMessage }) => {
    return (
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
    );
};

export default RandomQuestion;
