import { Box, CssBaseline, Container, Toolbar } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../admin/Sidebar";
import StatsCard from "../admin/StatCard";
import ReservationList from "../Reservation/ReservationList.jsx";
import ReservationDelete from "../Reservation/ReservationForm";
import Statistics from "../Statistics/Statistics.jsx";

const Dashboard = () => {
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Sidebar open={open} toggleDrawer={toggleDrawer} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, background: "#F4F4F4", minHeight: "100vh" }}>
                <Toolbar />
                <h1>Tableau de Bord</h1>
                <Container>
                    <Routes>
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/reservations" element={<ReservationList />} />
                        <Route path="/deletion" element={<ReservationDelete />} />
                    </Routes>
                </Container>
            </Box>
        </Box>
    );
};

export default Dashboard;
