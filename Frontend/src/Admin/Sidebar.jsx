import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    AppBar,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BarChart, Home, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const compactWidth = 60;

const Sidebar = ({ open, toggleDrawer }) => {
    return (
        <>
            {/* Barre de navigation en haut */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Tableau de Bord
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
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
                    },
                }}
            >
                <Toolbar />
                <List>
                    {[
                        { text: "Dashboard", icon: <Home />, link: "/dashboard/" },
                        { text: "Statistiques", icon: <BarChart />, link: "/dashboard/statistics" },
                        { text: "Paramètres", icon: <Settings />, link: "/dashboard/settings" },
                    ].map((item) => (
                        <ListItem button key={item.text} component={Link} to={item.link} sx={{ justifyContent: open ? "initial" : "center" }}>
                            <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                                {item.icon}
                            </ListItemIcon>
                            {open && <ListItemText primary={item.text} />}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Sidebar;
