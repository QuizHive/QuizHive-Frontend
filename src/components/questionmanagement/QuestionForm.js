import React, { useState } from 'react';
import './questionForm.css';

const QuestionForm = ({ onAddQuestion, darkMode }) => {
    const [category, setCategory] = useState('SHOPPING');
    const [title, setTitle] = useState('');
    const [questionText, setDescription] = useState('');
    const [options, setOptions] = useState(['', '', '', '']); // Array for options
    const [correct, setCorrectAnswer] = useState(''); // Will be a number (1-4)
    const [difficulty, setDifficulty] = useState(1); // Default to EASY (1)

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value; // Update the option at the specific index
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuestion = {
            category,
            questionText,
            options,
            correct: Number(correct), // Convert to number
            difficulty // This is already a number
        };
        onAddQuestion(newQuestion);
        // Reset the form
        setTitle('');
        setDescription('');
        setOptions(['', '', '', '']);
        setCorrectAnswer(''); // Reset correctly to empty
        setDifficulty(1); // Reset difficulty to default (1)
    };

    return (
        <div className={`question-form ${darkMode ? 'dark-mode' : ''}`}>
            <h1>Create a Question</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="SHOPPING">SHOPPING</option>
                        <option value="WORK">WORK</option>
                        <option value="SPORT">SPORT</option>
                        <option value="MUSIC">MUSIC</option>
                    </select>
                </div>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your question here"
                    />
                </div>
                <div>
                    <label>Difficulty:</label>
                    <select value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
                        <option value={1}>Easy</option>
                        <option value={2}>Medium</option>
                        <option value={3}>Hard</option>
                    </select>
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={questionText}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description here"
                        required
                    />
                </div>
                <div>
                    {options.map((option, index) => (
                        <div key={index} className="option_field">
                            <label>Option {String.fromCharCode(97 + index).toUpperCase()}:</label>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)} // Update specific option
                                placeholder={`Enter Option ${String.fromCharCode(97 + index).toUpperCase()}`}
                                required
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <label>Correct Answer:</label>
                    <select value={correct} onChange={(e) => setCorrectAnswer(Number(e.target.value))} required>
                        <option value="" disabled>Select the correct answer</option>
                        {['1', '2', '3', '4'].map((opt, index) => (
                            <option key={opt} value={index + 1}>{`Option ${String.fromCharCode(97 + index).toUpperCase()}`}</option>
                        ))}
                    </select>
                </div>
                <button className="btn_add_fin" type="submit">ADD</button>
            </form>
        </div>
    );
};

export default QuestionForm;
