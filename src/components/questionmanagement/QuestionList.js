import React from 'react';
import QuestionItem from './QuestionItem';
import './questionList.css';

const QuestionList = ({ questions, darkMode }) => {
    return (
        <div className={`question-list ${darkMode ? 'dark-mode' : ''}`}>
            <h2>Existing Questions:</h2>
            <ul>
                {questions.map((question, index) => (
                    <QuestionItem key={index} question={question} />
                ))}
            </ul>
        </div>
    );
};

export default QuestionList;
