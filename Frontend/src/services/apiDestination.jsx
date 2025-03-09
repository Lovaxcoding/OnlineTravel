import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/destinations";

export const getDestination = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Retourne les données directement
    } catch (error) {
        console.error("Erreur lors de la récupération des destinations", error);
        return []; // Retourne un tableau vide en cas d'erreur
    }
};

export const addDestination = async (destination) => {
    try {
        const response = await axios.post(API_URL, destination);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la destination", error);
        return null;
    }
};

export const deleteDestination = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Erreur lors de la suppression de la destination", error);
    }
};

export const updateDestination = async (id, destination) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, destination);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la destination", error);
        return null;
    }
};

export const getDestinationById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;

    }
    catch (error) {
        console.error("Erreur lors de la récuperation " , error);
        return null;
    }
}