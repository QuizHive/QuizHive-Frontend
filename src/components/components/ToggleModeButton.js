import React from 'react';
import './toggleModeButton.css';

const ToggleModeButton = () => {
    const toggleDarkMode = () => {
        const body = document.body;
        body.classList.toggle('dark-mode');
        const modeToggleText = document.getElementById('mode-toggle-sign');
        modeToggleText.textContent = body.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    };

    return (
        <button id="mode-toggle-sign" onClick={toggleDarkMode}>
            Switch to Dark Mode
        </button>
    );
};

export default ToggleModeButton;
