import React from 'react';
import './QuestionAccordion.css';
import api from "../../utils/axios";

const QuestionAccordion = ({
                               question,
                               index,
                               openIndex,
                               toggleAccordion,
                               handleSubmitAnswer,
                               userAnswers,
                               setUserAnswers,
                               questionResults
                           }) => {
    const questionDifficulty = (question.difficulty === 1 ? "Easy" : (question.difficulty === 2 ? "Normal" : "Hard"));
    const questionCategory = question.category.categoryName;

    const handleFollowDeveloper = async (creator) => {
        try {
            console.log(question)
            // TODO
            await api.post(`/users/follow/${creator}`, {});
            alert('Developer followed successfully!');
        } catch (error) {
            console.error('Error following developer:', error);
            alert('An error occurred while trying to follow the developer.');
        }
    };

    return (
        <div className="acc-item">
            <button
                className={`acc-btn ${openIndex === index ? 'is-open' : ''}`}
                onClick={() => toggleAccordion(index)}
            >
                <span className="score-icon">⭐</span> {questionDifficulty}
                <span className="category"> [{questionCategory}]</span> {question.question}
                <span className="category-label">{question.text}</span>
            </button>
            <div className="acc-content" style={{ maxHeight: openIndex === index ? '1000px' : '0' }}>
                <div className="developer-info">
                    <strong>Developer:</strong> {question.creator}
                    <button
                        className="follow-btn"
                        onClick={() => handleFollowDeveloper(question.creator)}
                    >
                        Follow
                    </button>
                </div>
                <form onSubmit={(e) => handleSubmitAnswer(e, question, index)}>
                    {question.options.map((option, idx) => (
                        <div key={idx}>
                            <label>
                                <input
                                    type="radio"
                                    name={`answer${index}`}
                                    value={idx}
                                    onChange={() => setUserAnswers({ ...userAnswers, [index]: idx })}
                                    required
                                /> {option}
                            </label>
                            <br />
                        </div>
                    ))}
                    <button className="btn" type="submit">Submit</button>
                    <p className="result-message">{questionResults[index]}</p>
                </form>
            </div>
        </div>
    );
};

export default QuestionAccordion;
