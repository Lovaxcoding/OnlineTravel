import React, { createContext, useState, useEffect } from 'react';

import axiosInstance from '../services/axios';
import {useNavigate} from "react-router-dom";  // Assume axiosInstance is already set up for API calls

// Création du contexte
export const AuthContext = createContext();

// Composant Provider
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        // Vérification si un utilisateur est authentifié sur le serveur (vérification de la session active)
        axiosInstance.get("/auth/check-session", { withCredentials: true })
            .then((response) => {
                setIsLoggedIn(true);
                setUser(response.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.user)); // Sauvegarder les infos de l'utilisateur
            })
            .catch(() => {
                setIsLoggedIn(false);
                setUser(null);
                localStorage.removeItem('user'); // Si la session est expirée, supprimer les données utilisateur
            });
    }, []);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Enregistrer les données utilisateur dans localStorage
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
        // Supprimer l'utilisateur du localStorage lors de la déconnexion
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
