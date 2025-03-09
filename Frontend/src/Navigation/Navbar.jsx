import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { styled } from "@mui/system";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React, { useContext, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService.js";
import { AuthContext } from "../Context/AuthContext.jsx";

const Navbar = () => {
    // État pour gérer le mode sombre/clair
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Fonction pour basculer entre le mode sombre et clair
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.style.backgroundColor = darkMode ? "#ffffff" : "#121212";
    };

    const handleLogout = () => {
        logout(); // Appel de la fonction logout depuis le contexte
        navigate('/'); // Redirection vers la page d'accueil après la déconnexion
    };

    return (
        <AppBar position="relative" elevation={0} sx={{ backgroundColor: darkMode ? "#121212" : "white", color: darkMode ? "white" : "black", zIndex: 100 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Logo */}
                <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1rem" }}>
                    Onlive <span style={{ fontWeight: "300" }}>Travel</span>
                </Typography>

                {/* Menu - Affichage en mode mobile ou bureau */}
                <Box sx={{ display: isMobile ? "none" : "flex", gap: 4 }}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Typography variant="body1" sx={{ cursor: "pointer", fontSize: "0.8rem" }}>Home</Typography>
                    </Link>
                    <Link to="/destination" style={{ textDecoration: "none" }}>
                        <Typography variant="body1" sx={{ cursor: "pointer", fontSize: "0.8rem" }}>Destination</Typography>
                    </Link>
                    <Link to="/offre" style={{ textDecoration: "none" }}>
                        <Typography variant="body1" sx={{ cursor: "pointer", fontSize: "0.8rem" }}>Offre</Typography>
                    </Link>
                    <Link to="/location" style={{ textDecoration: "none" }}>
                        <Typography variant="body1" sx={{ cursor: "pointer", fontSize: "0.8rem" }}>Location</Typography>
                    </Link>
                </Box>

                {/* Icône de mode sombre/clair et téléphone */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", color: darkMode ? "gray" : "black" }}>
                        <PhoneIcon sx={{ fontSize: "0.8rem", marginRight: "5px" }} />
                        <Typography variant="body1">034 45 832 02</Typography>
                    </Box>

                    {/* Affichage conditionnel du bouton Se déconnecter ou Se connecter */}
                    {isLoggedIn ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            {/* Lien vers le profil de l'utilisateur */}
                            <Link to={`/profile/${user?.id}`} style={{ textDecoration: "none" }}>
                                <IconButton>
                                    <AccountCircle fontSize="large" />
                                </IconButton>
                            </Link>

                            {/* Bouton Se déconnecter */}
                            <Button
                                variant="contained"
                                onClick={handleLogout}
                                sx={{
                                    backgroundColor: "#2d7f96",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "0.8rem",
                                    borderRadius: "5px",
                                    textTransform: "none",
                                }}
                            >
                                Se déconnecter
                            </Button>
                        </Box>
                    ) : (
                        <Link to="/loginPageUser" style={{ textDecoration: "none" }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#2d7f96",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "0.8rem",
                                    borderRadius: "5px",
                                    textTransform: "none",
                                }}
                            >
                                Se connecter
                            </Button>
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
