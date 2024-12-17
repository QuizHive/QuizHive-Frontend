
import './CategoryForm.css';
// src/components/CategoryForm.js
import React, { useState } from 'react';

const CategoryForm = ({ addNewCategory }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddCategory = () => {
        addNewCategory(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <table className="category-form">
            <tbody>
            <tr>
                <th></th>
                <th>Title</th>
            </tr>
            <tr>
                <td></td>
                <td>
                    <input
                        type="text"
                        className="input_title_desc"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </td>
                <td></td>
            </tr>
            <tr>
                <th className="titl_description">Description</th>
            </tr>
            <tr>
                <td colSpan="3">
                    <input
                        type="text"
                        className="input_description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </td>
            </tr>
            <tr>
                <td colSpan="3">
                    <button className="btn_add_fin" onClick={handleAddCategory}>
                        ADD
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default CategoryForm;
