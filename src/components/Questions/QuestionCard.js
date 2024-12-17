// src/components/QuestionCard.js
import React from 'react';
import './QuestionCard.css';
const QuestionCard = ({ question, index, openedAccordion, onAccordionClick }) => {
    return (
        <div key={index} className="acc-item" data-difficulty={question.difficulty} data-category={question.category}>
            <button className="acc-btn" onClick={() => onAccordionClick(index)}>
                <span className="score-icon">⭐</span>
                <span className="score">{question.difficulty.toUpperCase()}</span>
                <span className="category-label">[{question.category.charAt(0).toUpperCase() + question.category.slice(1)}]</span>
                {question.question}
            </button>
            <div className="acc-content" style={{ maxHeight: openedAccordion === index ? '100%' : '0' }}>
                <p>Your Answer: {question.userAnswer} <span className={`answer-status ${question.answerStatus}`}>
                    ({question.answerStatus.charAt(0).toUpperCase() + question.answerStatus.slice(1)})</span>
                </p>
                <ul className="options-list">
                    {question.options.map((option, idx) => (
                        <li key={idx} className={option.startsWith(question.userAnswer) ? 'selected-option' : ''}>
                            {option}
                            {option.startsWith(question.correctAnswer) && (
                                <span className="correct-answer">(Correct Answer)</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuestionCard;
