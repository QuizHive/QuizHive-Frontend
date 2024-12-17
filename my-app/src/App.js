import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionManagement from './components/QuestionManagement';
import Questions from './components/Questions';
import SigninSignUp from './components/SigninSignUp';
import MainMenu from './components/MainMenu';
import Leaderboard from './components/Leaderboard';
import Category from './components/Category';
import Answering from './components/Answering';
import PrivateRoute from './components/PrivateRoute';  // اضافه کردن Import برای PrivateRoute

// Importing CSS files
import './styles/management.css';
import './styles/mainmenu.css';
import './styles/leaderboard.css';
import './styles/category.css';
import './styles/answering.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/question-management" element={
                    <PrivateRoute>
                        <QuestionManagement />
                    </PrivateRoute>
                } />
                <Route path="/answering" element={
                    <PrivateRoute>
                        <Answering />
                    </PrivateRoute>
                } />
                <Route path="/questions" element={
                    <PrivateRoute>
                        <Questions />
                    </PrivateRoute>
                } />
                <Route path="/signin-signup" element={<SigninSignUp />} />
                <Route path="/main-menu" element={
                    <PrivateRoute>
                        <MainMenu />
                    </PrivateRoute>
                } />
                <Route path="/leaderboard" element={
                    <PrivateRoute>
                        <Leaderboard />
                    </PrivateRoute>
                } />
                <Route path="/category" element={
                    <PrivateRoute>
                        <Category />
                    </PrivateRoute>
                } />
                <Route path="/" element={<SigninSignUp />} exact />
            </Routes>
        </Router>
    );
}

export default App;
