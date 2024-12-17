// src/components/QuestionAccordion.js
import React from 'react';
import './QuestionAccordion.css';

const QuestionAccordion = ({ question, index, openIndex, toggleAccordion, handleSubmitAnswer, userAnswers, setUserAnswers, questionResults }) => {
    return (
        <div className="acc-item">
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
    );
};

export default QuestionAccordion;
