import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionManagement from './components/QuestionManagement';
import Questions from './components/Questions';
import SigninSignUp from './components/SigninSignUp';
import MainMenu from './components/MainMenu';
import Leaderboard from './components/Leaderboard';
import Category from './components/Category';
import Answering from './components/Answering';

// Importing CSS files
import './styles/management.css';
// Removed './styles/signinlogin.css'; as it is now handled locally in the SigninSignUp components
import './styles/mainmenu.css';
import './styles/leaderboard.css';
import './styles/category.css';
import './styles/answering.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/question-management" element={<QuestionManagement />} />
          <Route path="/answering" element={<Answering />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/signin-signup" element={<SigninSignUp />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/" element={<SigninSignUp />} exact />
        </Routes>
      </Router>
  );
}

export default App;
