import React, {useState} from 'react';
import './questionForm.css';

const QuestionForm = ({ onAddQuestion, darkMode }) => {
    const [category, setCategory] = useState('SHOPPING');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState({a: '', b: '', c: '', d: ''});
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [difficulty, setDifficulty] = useState('EASY');

    const handleOptionChange = (e) => {
        const { name, value } = e.target;
        setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuestion = { category, title, description, options, correctAnswer, difficulty };
        onAddQuestion(newQuestion);
        setTitle('');
        setDescription('');
        setOptions({a: '', b: '', c: '', d: ''});
        setCorrectAnswer('');
        setDifficulty('EASY');
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
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="HARD">HARD</option>
                        <option value="NORMAL">NORMAL</option>
                        <option value="EASY">EASY</option>
                    </select>
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description here"
                        required
                    />
                </div>
                <div>
                    {['a', 'b', 'c', 'd'].map((option) => (
                        <div key={option} className="option_field">
                            <label>Option {option.toUpperCase()}:</label>
                            <input
                                type="text"
                                name={option}
                                value={options[option]}
                                onChange={handleOptionChange}
                                placeholder={`Enter Option ${option.toUpperCase()}`}
                                required
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <label>Correct Answer:</label>
                    <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required>
                        <option value="" disabled>Select the correct answer</option>
                        {['A', 'B', 'C', 'D'].map((opt) => (
                            <option key={opt} value={opt}>{`Option ${opt}`}</option>
                        ))}
                    </select>
                </div>
                <button className="btn_add_fin" type="submit">ADD</button>
            </form>
        </div>
    );
};

export default QuestionForm;
