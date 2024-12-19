
import './CategoryItem.css';
import React from 'react';

const CategoryItem = ({ category }) => (
    <li className="list_shopping list_dsp_true">
        <div className="col_md_1_list">
            <p>{category.categoryName}</p>
        </div>
        <div className="col_md_2_list">
            <h4>{category.description}</h4>
        </div>
    </li>
);

export default CategoryItem;
