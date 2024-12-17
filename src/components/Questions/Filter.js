// src/components/Filter.js
import React from 'react';
import './Filter.css';

const Filter = ({ difficultyFilter, setDifficultyFilter, categoryFilter, setCategoryFilter }) => {
    return (
        <div className="filter-options">
            <select id="difficulty-select-q" value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
            </select>
            <select id="category-select-q" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="science">Science</option>
                <option value="legal">Legal</option>
                <option value="nature">Nature</option>
            </select>
        </div>
    );
};

export default Filter;
