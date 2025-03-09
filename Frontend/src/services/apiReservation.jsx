import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/reservations"; //

export const getReservations = async () => {
    return await axios.get(API_URL);
};

export const deleteReservation = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

export const addReservation = async (reservation) => {
    try {

        console.log("🔍 Données envoyées à l'API :", JSON.stringify(reservation, null, 2)); // Vérifier les données envoyées
        const response = await axios.post(API_URL, reservation, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log("✅ Réservation réussie :", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Erreur lors de l'ajout de la réservation:", error.response?.data || error.message);
        throw error;
    }
};


export const updateReservationStatus = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/reservations/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Mise à jour réussie :", response.data);
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
    }
};

export const getReservationById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de la réservation :", error);
        throw error;
    }
};



