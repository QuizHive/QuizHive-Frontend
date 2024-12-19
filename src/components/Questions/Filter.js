import React from 'react';
import './Filter.css';

const Filter = ({ difficultyFilter, setDifficultyFilter, categoryFilter, setCategoryFilter, categories }) => {
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
                {categories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
