import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext"; // Vérifie que le chemin est correct

const ProtectedRoute = () => {
    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn === null) return <h1>Vérification de la session...</h1>; // Loader temporaire

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
