import { Box, CssBaseline, Container, Toolbar, CircularProgress, Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../admin/Sidebar";
import StatsCard from "../admin/StatCard";
import ReservationList from "../Reservation/ReservationList.jsx";
import Statistics from "../Statistics/Statistics.jsx";
import UserList from "../User/UserList.jsx";
import axios from "axios";
import Destinations from "../Destination/Destinations.jsx";
import { Home, People, EventNote, LocationOn } from '@mui/icons-material'; // Modern Icons


const Dashboard = () => {
    const [open, setOpen] = useState(true);
    const [sessionActive, setSessionActive] = useState(null);
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const checkSessionStatus = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/auth/check-session", { withCredentials: true });
                console.log("✅ Session active:", response.data);
                setSessionActive(true);
            } catch (error) {
                console.log("❌ Session expired, redirecting to login...");
                setSessionActive(false);
                navigate("/loginPageAdmin");
            }
        };
        checkSessionStatus();
    }, [navigate]);

    if (sessionActive === null) {
        return <CircularProgress size={50} sx={{ display: 'block', margin: 'auto', marginTop: '20%' }} />;
    }

    return (
        <Box sx={{ display: "flex", backgroundColor: '#f5f5f5' }}>
            <CssBaseline />
            <Sidebar open={open} toggleDrawer={toggleDrawer} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh", backgroundColor: "#fafafa" }}>
                <Toolbar />
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#004C8C' }}>
                    Tableau de Bord
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2, background: '#ffffff' }}>
                            <CardContent>
                                <Home sx={{ fontSize: 40, color: '#004C8C' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>Accueil</Typography>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 2, textTransform: 'none' }}
                                    color="primary"
                                    onClick={() => navigate("/home")}
                                >
                                    Voir Plus
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2, background: '#ffffff' }}>
                            <CardContent>
                                <People sx={{ fontSize: 40, color: '#004C8C' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>Utilisateurs</Typography>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 2, textTransform: 'none' }}
                                    color="primary"
                                    onClick={() => navigate("/users")}
                                >
                                    Voir Liste
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2, background: '#ffffff' }}>
                            <CardContent>
                                <EventNote sx={{ fontSize: 40, color: '#004C8C' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>Réservations</Typography>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 2, textTransform: 'none' }}
                                    color="primary"
                                    onClick={() => navigate("/reservations")}
                                >
                                    Voir Réservations
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2, background: '#ffffff' }}>
                            <CardContent>
                                <LocationOn sx={{ fontSize: 40, color: '#004C8C' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>Destinations</Typography>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 2, textTransform: 'none' }}
                                    color="primary"
                                    onClick={() => navigate("/destination")}
                                >
                                    Voir Destinations
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Container sx={{ marginTop: 5 }}>
                    <Routes>
                        <Route path="statistics" element={<Statistics />} />
                        <Route path="reservations" element={<ReservationList />} />
                        <Route path="users" element={<UserList />} />
                        <Route path="destination" element={<Destinations />} />
                    </Routes>
                </Container>
                <StatsCard />
                <ReservationList />
                <UserList />
                <Destinations />
            </Box>
        </Box>
    );
};

export default Dashboard;
