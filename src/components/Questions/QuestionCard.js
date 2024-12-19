import React, { useRef } from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, index, openedAccordion, onAccordionClick }) => {
    const difficultyString = (question.difficulty === 1 ? "Easy" : (question.difficulty === 2 ? "Normal" : "Hard"));
    const categoryString = question.category.categoryName;
    const contentRef = useRef(null);

    const getOptionLabel = (index) => String.fromCharCode(65 + index);

    return (
        <div key={index} className="acc-item" data-difficulty={question.difficulty} data-category={categoryString}>
            <button className="acc-btn" onClick={() => onAccordionClick(index)}>
                <span className="score-icon">⭐ </span>
                <span className="score">{difficultyString} </span>
                <span className="category-label">[{categoryString}] </span>
                <span className="category-label">{question.text}</span>
                {question.title}
            </button>
            <div
                ref={contentRef}
                className="acc-content"
                style={{
                    maxHeight: openedAccordion === index ? `${contentRef.current.scrollHeight}px` : '0'
                }}
            >
                <p>
                    Your Answer: {getOptionLabel(question.lastChoiceByUser)}
                    <span className={`answer-status ${question.lastChoiceByUser === question.correct ? 'correct' : 'incorrect'}`}>
                        ({question.lastChoiceByUser === question.correct ? 'Correct' : 'Incorrect'})
                    </span>
                </p>
                <ul className="options-list">
                    {question.options.map((option, idx) => (
                        <li key={idx} className={question.lastChoiceByUser === idx ? 'selected-option' : ''}>
                            {getOptionLabel(idx)}. {option}
                            {idx === question.correct && (
                                <span className="correct-answer"> (Correct Answer)</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuestionCard;
