import React, { useState } from 'react';
import './CategoryList.css';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories, isDarkMode }) => (
    <ul id="category-list" className={isDarkMode ? 'dark-mode' : ''}>
        {categories.map((category, index) => (
            <CategoryItem key={index} category={category} />
        ))}
    </ul>
);

export default CategoryList;
