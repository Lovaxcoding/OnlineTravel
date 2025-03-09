import axios from 'axios';

// Créez une instance d'Axios avec la base URL de votre API
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // Remplacez par l'URL de votre API Spring Boot
    withCredentials: true, // Cette option permet d'envoyer les cookies avec chaque requête
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;
