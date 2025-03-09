import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../Context/AuthContext.jsx";



const DestinationDetails = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const MotionButton = motion(Button);
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchDestination = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/api/v1/destinations/${id}`, {
                    signal: controller.signal,
                });
                if (isMounted) setDestination(data);
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchDestination();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" mt={5}>
                <Typography variant="h6" color="error">Erreur : {error}</Typography>
            </Box>
        );
    }

    if (!destination) {
        return (
            <Box textAlign="center" mt={5}>
                <Typography variant="h6">Aucune destination trouvée.</Typography>
            </Box>
        );
    }


    const handleReservation = () => {
        if (isLoggedIn) {
            navigate(`/reservation?destination=${destination?.id}`);
        } else {
            navigate(`/login?destination=${destination?.id}`);
        }
    };


    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100vh",
                background: `url(/${destination.background_image_path}) center/cover no-repeat`,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                boxSizing: "border-box",
                imageRendering: 'crisp-edges'
            }}
        >
            {/* Overlay en dégradé pour lisibilité */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1))",
                    zIndex: 1,
                }}
            />

            {/* Contenu */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    color: "#fff",
                    maxWidth: "500px",
                    textAlign: "right",
                    padding: "40px",
                }}
            >
                <Typography variant="h3" fontWeight="bold">
                    {destination.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, opacity: 0.8 }}>
                    {destination.description}
                </Typography>
                <Typography variant="h5" sx={{ mt: 2, color: "#FFD700" }}>
                    Prix : {destination.price} €
                </Typography>
                <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: "bold" }}>
                    Durée : {destination.duration_days} jours
                </Typography>

                {destination.hotel && (
                    <Paper
                        elevation={3}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            color: "#fff",
                            padding: "15px",
                            borderRadius: "10px",
                            mt: 2,
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">🏨 {destination.hotel.name}</Typography>
                        <Typography variant="body1">📍 {destination.hotel.address}</Typography>
                        <Typography variant="body1">⭐ {destination.hotel.stars} étoiles</Typography>
                    </Paper>
                )}

                <MotionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                        backgroundColor: "#FFD700",
                        color: "#000",
                        fontSize: "1.2rem",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        marginTop: "20px",
                        '&:hover': { backgroundColor: "#FFC107" }
                    }}
                    onClick={handleReservation}
                >
                    Réserver
                </MotionButton>

            </Box>
        </Box>
    );
};

export default DestinationDetails;
