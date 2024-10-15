// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./style.css"
import { AuthContextProvider } from './authContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </AuthContextProvider>
);
