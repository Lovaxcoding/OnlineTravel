import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link, useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { AuthContext } from "../Context/AuthContext.jsx";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ProfileToggleDrawer from "./ProfileToggleDrawer.jsx";

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [openProfile, setOpenProfile] = useState(false); // État pour gérer l'ouverture du profil
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.style.backgroundColor = darkMode ? "#ffffff" : "#121212";
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleProfile = () => {
        setOpenProfile(!openProfile); // Toggle de la visibilité du profil
    };

    return (
        <AppBar position="relative" elevation={0} sx={{ backgroundColor: darkMode ? "#121212" : "white", color: darkMode ? "white" : "black", zIndex: 100 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Logo et navigation */}
                <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1rem" }}>
                    Onlive <span style={{ fontWeight: "300" }}>Travel</span>
                </Typography>

                {/* Menu */}
                <Box sx={{ display: isMobile ? "none" : "flex", gap: 4 }}>
                    <Link to="/" style={{ textDecoration: "none" }}><Typography variant="body1">Home</Typography></Link>
                    <Link to="/destination" style={{ textDecoration: "none" }}><Typography variant="body1">Destination</Typography></Link>
                    <Link to="/offre" style={{ textDecoration: "none" }}><Typography variant="body1">Offre</Typography></Link>
                    <Link to="/location" style={{ textDecoration: "none" }}><Typography variant="body1">Location</Typography></Link>
                </Box>

                {/* Icône de téléphone et icône de profil */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", color: darkMode ? "gray" : "black" }}>
                        <PhoneIcon sx={{ fontSize: "0.8rem", marginRight: "5px" }} />
                        <Typography variant="body1">034 45 832 02</Typography>
                    </Box>

                    {/* Bouton pour ouvrir le profil */}
                    {isLoggedIn && (
                        <IconButton onClick={toggleProfile}>
                            <AccountCircle fontSize="large" />
                        </IconButton>
                    )}

                    {/* Déconnexion ou connexion */}
                    {isLoggedIn ? (
                        <Button variant="contained" onClick={handleLogout}>Se déconnecter</Button>
                    ) : (
                        <Link to="/loginPageUser"><Button variant="contained">Se connecter</Button></Link>
                    )}
                </Box>
            </Toolbar>

            {/* Drawer pour afficher le profil */}
            <ProfileToggleDrawer open={openProfile} toggle={toggleProfile} user={user} />
        </AppBar>
    );
};

export default Navbar;
