import React from 'react';
import './questionItem.css';

const QuestionItem = ({ question }) => {
    return (
        <li className="existing-question">
            <strong>Category:</strong> {question.category}<br />
            <strong>Title:</strong> {question.title}<br />
            <strong>Description:</strong> {question.description}<br />
            <strong>Difficulty:</strong> {question.difficulty}<br />
            <strong>Options:</strong>
            <ul>
                <li>A: {question.options.a}</li>
                <li>B: {question.options.b}</li>
                <li>C: {question.options.c}</li>
                <li>D: {question.options.d}</li>
            </ul>
            <strong>Correct Answer:</strong> {question.correctAnswer}
        </li>
    );
};

export default QuestionItem;
