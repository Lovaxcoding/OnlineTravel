import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/reservations"; // Remplace par ton URL

export const getReservations = async () => {
    return await axios.get(API_URL);
};

export const deleteReservation = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

export const addReservation = async (reservation) => {
    return await axios.post(API_URL, reservation);
};
