import React, { useState, useEffect } from 'react';
import './questionForm.css';
import api from '../../utils/axios';

const QuestionForm = ({ onAddQuestion, darkMode }) => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [title, setTitle] = useState('');
    const [questionText, setDescription] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correct, setCorrectAnswer] = useState('');
    const [difficulty, setDifficulty] = useState(1);

    useEffect(() => {
        const fetchCategories = () => {
            api.get('/questions/categories')
                .then(response => {
                    const categoryData = response.data.map(category => ({
                        id: category.id,
                        name: category.categoryName,
                    }));
                    setCategories(categoryData);
                    console.log(response.data);
                    if (categoryData.length > 0) {
                        setCategoryId(categoryData[0]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        };

        fetchCategories();
    }, []);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuestion = {
            title,
            categoryId: categoryId,
            text: questionText,
            options,
            correct: Number(correct)-1,
            difficulty
        };
        onAddQuestion(newQuestion);
        setTitle('');
        setDescription('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
        setDifficulty(1);
    };

    return (
        <div className={`question-form ${darkMode ? 'dark-mode' : ''}`}>
            <h1>Create a Question</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category:</label>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        {categories.map((cat, index) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your question here"
                        required
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
                                onChange={(e) => handleOptionChange(index, e.target.value)}
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
