import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Snackbar, Alert } from "@mui/material";
import Sidebar from "../Admin/Sidebar.jsx";
import Dashboard from "/Dashboard.jsx";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const Pageadmin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sessionChecked, setSessionChecked] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const checkSessionStatus = async () => {
            try {
                const response = await fetch("/api/check-session");
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Erreur de vérification de session :", error);
            } finally {
                setSessionChecked(true);
            }
        };

        checkSessionStatus();

        // Vérification de session périodique toutes les 5 min
        const interval = setInterval(checkSessionStatus, 300000);
        return () => clearInterval(interval);
    }, []);

    if (!sessionChecked) {
        return <div>Chargement...</div>; // Amélioration UX
    }

    return (
        <Router>
            <CssBaseline />
            <div style={{ display: "flex" }}>
                {isAuthenticated && <Sidebar />}
                <div style={{ flexGrow: 1, padding: "20px" }}>
                    <Routes>
                        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>

            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
                <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                    Action réalisée avec succès !
                </Alert>
            </Snackbar>
        </Router>
    );
};

export default Pageadmin;
