import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/category.css';
import LogoutButton from './components/LogoutButton';
import ToggleModeButton from './components/ToggleModeButton';
import CategoryList from './category/CategoryList';
import CategoryForm from './category/CategoryForm';
import api from "../utils/axios";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [isFormActive, setIsFormActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        api.get('/questions/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    };

    const toggleForm = () => {
        setIsFormActive(!isFormActive);
    };

    const addNewCategory = (categoryName, description) => {
        if (!categoryName || !description) {
            alert('Please fill in both the title and description');
            return;
        }

        api.post('/questions/category', { categoryName: categoryName, description: description })
            .then(response => {
                fetchCategories();
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
        <>
            <LogoutButton onLogout={handleBack} buttonText="Back" />
            <ToggleModeButton />

            <div className="cont_centrar">
                <div className="cont_todo_list_top">
                    <div className="cont_titulo_cont">
                        <h3>CATEGORIES</h3>
                    </div>
                    <div className="cont_add_titulo_cont">
                        <button onClick={toggleForm}>
                            <h4 className="material-icons">⬤</h4>
                        </button>
                    </div>
                </div>

                {isFormActive && <CategoryForm addNewCategory={addNewCategory} />}

                <div className="cont_princ_lists">
                    <CategoryList categories={categories} />
                </div>
            </div>
        </>
    );
};

export default Category;
