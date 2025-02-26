import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/user"; // Mets l'URL de ton backend

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

// Ajouter un utilisateur
export const addUser = async (user) => {
    try {
        const response = await axios.post(API_URL, user);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
        return null;
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
