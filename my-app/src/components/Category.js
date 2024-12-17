import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; // اضافه کردن axios
import '../styles/category.css';
import LogoutButton from './components/LogoutButton';
import ToggleModeButton from "./components/ToggleModeButton";

const SigninSignUp = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isFormActive, setIsFormActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // دریافت لیست دسته‌ها از بک‌اند
        axios.get('/api/categories')
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

    const addNewCategory = () => {
        if (!title || !description) {
            alert('Please fill in both the title and description');
            return;
        }

        const newCategory = {title, description};

        // ارسال درخواست به بک‌اند برای اضافه کردن دسته جدید
        axios.post('/api/categories', newCategory)
            .then(response => {
                setCategories(prevCategories => [...prevCategories, response.data]);
                setTitle('');
                setDescription('');
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

                {isFormActive && (
                    <table className="table">
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
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <button className="btn_add_fin" onClick={addNewCategory}>
                                    ADD
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                )}

                <div className="cont_princ_lists">
                    <ul id="category-list">
                        {categories.map((category, index) => (
                            <li key={index} className="list_shopping list_dsp_true">
                                <div className="col_md_1_list">
                                    <p>{category.title}</p>
                                </div>
                                <div className="col_md_2_list">
                                    <h4>{category.description}</h4>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SigninSignUp;
