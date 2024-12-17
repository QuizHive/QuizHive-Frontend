
import './CategoryList.css';
// src/components/CategoryList.js
import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories }) => (
    <ul id="category-list">
        {categories.map((category, index) => (
            <CategoryItem key={index} category={category} />
        ))}
    </ul>
);

export default CategoryList;
