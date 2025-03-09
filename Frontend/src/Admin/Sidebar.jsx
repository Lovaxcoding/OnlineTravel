import React, { useContext } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, AppBar, Toolbar, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import { CardTravel, Home, Settings, SupervisedUserCircle } from "@mui/icons-material";
import { BarChart } from "recharts";

const drawerWidth = 240;
const compactWidth = 60;

const Sidebar = ({ open, toggleDrawer }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNavigation = (link) => {
        navigate(link);
        toggleDrawer();
    };

    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#004C8C' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Tableau de Bord
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ borderRadius: 20 }}
                        onClick={logout}
                    >
                        Se déconnecter
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: open ? drawerWidth : compactWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: open ? drawerWidth : compactWidth,
                        boxSizing: "border-box",
                        transition: "width 0.3s ease",
                        overflowX: "hidden",
                        bgcolor: "#f5f5f5",
                    },
                }}
            >
                <Toolbar />
                <List>
                    {[{
                        text: "Dashboard", icon: <Home sx={{ fontSize: 30 }} />, link: "/dashboard"
                    },
                        {
                            text: "Statistiques", icon: <BarChart sx={{ fontSize: 30 }} />, link: "/dashboard/statistics"
                        },
                        {
                            text: "Clients", icon: <SupervisedUserCircle sx={{ fontSize: 30 }} />, link: "/dashboard/users"
                        },
                        {
                            text: "Réservations", icon: <Settings sx={{ fontSize: 30 }} />, link: "/dashboard/reservations"
                        },
                        {
                            text: "Destinations", icon: <CardTravel sx={{ fontSize: 30 }} />, link: "/dashboard/destinations"
                        }].map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => handleNavigation(item.link)}
                            sx={{
                                justifyContent: open ? "initial" : "center",
                                borderRadius: 1,
                                mb: 1,
                                "&:hover": { bgcolor: "#E1F5FE" },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 0, justifyContent: "center", color: '#004C8C' }}>
                                {item.icon}
                            </ListItemIcon>
                            {open && (
                                <ListItemText
                                    primary={item.text}
                                    sx={{ fontWeight: 500 }}
                                />
                            )}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Sidebar;
