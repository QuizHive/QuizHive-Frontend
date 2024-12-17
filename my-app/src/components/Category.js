// src/components/SigninSignUp.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/category.css';
import LogoutButton from './components/LogoutButton';
import ToggleModeButton from './components/ToggleModeButton';
import CategoryList from './category/CategoryList';
import CategoryForm from './category/CategoryForm';
import API_BASE_URL from '../config/api';
const Category = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isFormActive, setIsFormActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('${API_BASE_URL}/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const toggleForm = () => {
        setIsFormActive(!isFormActive);
    };

    const addNewCategory = (title, description) => {
        if (!title || !description) {
            alert('Please fill in both the title and description');
            return;
        }

        const newCategory = { title, description };

        axios.post('${API_BASE_URL}/api/categories', newCategory)
            .then(response => {
                setCategories(prevCategories => [...prevCategories, response.data]);
                setIsFormActive(false);
            })
            .catch(error => {
                console.error('Error adding category:', error);
            });
    };

    const handleBack = () => {
        navigate('/main-menu');
    };

    return (
        <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <LogoutButton onLogout={handleBack} buttonText="Back" />
            <ToggleModeButton />

            <div className="cont_centrar">
                <div className="cont_todo_list_top">
                    <div className="cont_titulo_cont">
                        <h3>CATEGORIES</h3>
                    </div>
                    <div className="cont_add_titulo_cont">
                        <button onClick={toggleForm}>
                            <i className="material-icons">&#xE145;</i>
                        </button>
                    </div>
                </div>

                {isFormActive && <CategoryForm addNewCategory={addNewCategory} />}

                <div className="cont_princ_lists">
                    <CategoryList categories={categories} />
                </div>
            </div>
        </div>
    );
};

export default Category;
