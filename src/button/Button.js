import React from 'react';
import './Button.css';  // Le fichier CSS pour les styles des boutons

function Button({ label, isActive, onClick }) {
    return (
        <button
            className={`small-btn ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default Button;
