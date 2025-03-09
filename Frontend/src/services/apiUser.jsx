import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/user"; // Mets l'URL de ton backend

const API_URLregister = "http://localhost:8080/api/v1/auth/register";
const API_URLauth = "http://localhost:8080/api/v1/auth";

// Récupérer tous les utilisateurs
export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
        return [];
    }
};


// Mettre à jour un utilisateur
export const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, user);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur", error);
        return null;
    }
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
    }
};

export const getUserById = async (id)=> {
    try{
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;

    } catch (error) {
        console.error("Erreur lors de l'utilisateur", error);
        return null;
    }
}

export const addUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URLauth}/register`, userData, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Assure-toi que les cookies sont envoyés
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
        return null;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Important pour la session
        });
        return response.data;
    } catch (error) {
        console.error("Erreur de connexion", error);
        return null;
    }
};

export const checkSession = async () => {
    try {
        const response = await axios.get(`${API_URL}/check-session`, {
            withCredentials: true, // Permet de vérifier la session active
        });
        return response.data;
    } catch (error) {
        console.error("Session expirée ou invalide", error);
        return null;
    }
};

export const logoutUser = async () => {
    try {
        await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
        console.error("Erreur de déconnexion", error);
    }
};