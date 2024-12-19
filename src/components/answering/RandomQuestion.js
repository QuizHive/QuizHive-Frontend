import React from 'react';
import './RandomQuestions.css';

const RandomQuestion = ({ currentQuestion, displayRandomQuestion, submitRandomAnswer, resultMessage }) => {

    if (!currentQuestion) {
        return (
            <div className="random-question-section">
                <h3>Answer a Random Question</h3>
                <button className="btn random-btn" onClick={displayRandomQuestion}>Get Random Question</button>
                <p className="random-question">No question to display yet. Click the button to get a random question!</p>
            </div>
        );
    }

    const questionDifficulty = (currentQuestion.difficulty === 1 ? "Easy" : (currentQuestion.difficulty === 2 ? "Normal" : "Hard"));
    const questionCategory = currentQuestion.category.categoryName;

    return (
        <div className="random-question-section">
            <h3>Answer a Random Question</h3>
            <p className="random-question">Click the button to get a random question!</p>
            <button className="btn random-btn" onClick={displayRandomQuestion}>Get Random Question</button>

            <form className="random-question-form" onSubmit={submitRandomAnswer}>
                <h4>{currentQuestion.question}</h4>
                <span className="score-icon">⭐</span> {questionDifficulty}
                <span className="category"> [{questionCategory}] </span> <br/>
                <span className="category-label">{currentQuestion.text}</span> <br/>
                {currentQuestion.options.map((option, index) => (
                    <div key={index}>
                        <label>
                            <input type="radio" name="random-answer" value={index} required/> {option}
                        </label>
                    </div>
                ))}
                <button className="btn random-submit-btn" type="submit">Submit Answer</button>
                <p className="result-message">{resultMessage}</p>
            </form>
        </div>
    );
};

export default RandomQuestion;
