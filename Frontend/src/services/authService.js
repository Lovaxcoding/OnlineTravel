import axiosInstance from './axios';
import Swal from "sweetalert2";

export const login = async (email, password) => {
    try {
        // Utilisation d'un appel POST vers l'endpoint de connexion
        const response = await axiosInstance.post('/auth/login', {
            email,
            password,
        });
        Swal.fire({
            icon: 'success',
            title: 'Login Success',

        })
        return response.data; //

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        Swal.fire({
            icon: 'error',
            title: 'Information incorrecte, veuillez réessayer',

        })
    }
};

export const logout = async () => {
    try {
        await axiosInstance.post('/auth/logout'); // Appel de l'API de déconnexion
        // Supprimez les informations d'authentification du client
        localStorage.removeItem('authToken');
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
    }
};

