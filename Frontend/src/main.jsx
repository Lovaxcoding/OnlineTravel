import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assurez-vous que le chemin est correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
