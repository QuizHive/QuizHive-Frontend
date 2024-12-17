// src/components/Filters.js
import React from 'react';
import './Filters.css';

const Filters = ({ selectedDifficulty, setSelectedDifficulty, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="filter-options">
            <button className="filter-btn" onClick={() => setSelectedDifficulty('all')}>All</button>
            <button className="filter-btn" onClick={() => setSelectedDifficulty('easy')}>Easy</button>
            <button className="filter-btn" onClick={() => setSelectedDifficulty('normal')}>Normal</button>
            <button className="filter-btn" onClick={() => setSelectedDifficulty('hard')}>Hard</button>

            <select id="category-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="jokes">Jokes</option>
                <option value="science">Science</option>
                <option value="animals">Animals</option>
            </select>
        </div>
    );
};

export default Filters;
