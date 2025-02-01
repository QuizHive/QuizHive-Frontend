import React from 'react';
import './questionItem.css';

const QuestionItem = ({ question }) => {
    return (
        <li className="existing-question-qi">
            {/*TODO CATEGORYNAME fix she*/}
            <strong>Category:</strong> {question.categoryId ? question.categoryId : "N/A"}<br />
            <strong>Title:</strong> {question.title}<br />
            <strong>Description:</strong> {question.text}<br />
            <strong>Difficulty:</strong> {question.difficulty}<br />
            <strong>Options:</strong>
            <ul>
                <li>A: {question.options[0]}</li>
                <li>B: {question.options[1]}</li>
                <li>C: {question.options[2]}</li>
                <li>D: {question.options[3]}</li>
            </ul>
            <strong>Correct Answer:</strong> {question.correct}
        </li>
    );
};
export default QuestionItem;
