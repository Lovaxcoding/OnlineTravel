import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Grid, Avatar, Typography, Button, CircularProgress, Divider, Paper } from '@mui/material';
import axios from 'axios';

const Profile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Récupérer les informations de l'utilisateur
        axios.get(`http://localhost:8080/api/v1/user/${userId}`)
            .then(response => {
                setUser(response.data);
                setLoading(false);  // Fin du chargement des données utilisateur
            })
            .catch(error => {
                console.error("Erreur lors du chargement de l'utilisateur :", error);
                setLoading(false);
            });

        // Récupérer les réservations si c'est un client
        axios.get(`http://localhost:8080/api/v1/reservations?userId=${userId}`)
            .then(response => setReservations(response.data))
            .catch(error => console.error("Erreur lors du chargement des réservations :", error));
    }, [userId]);

    if (loading) return <CircularProgress size={50} sx={{ display: 'block', margin: 'auto' }} />;  // Affiche un loader pendant le chargement

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
                <Card sx={{ display: 'flex', flexDirection: 'column', p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <Grid container spacing={2} direction="column" alignItems="center">
                        <Grid item>
                            <Avatar
                                alt={user.username}
                                src={user.avatar || '/default-avatar.png'}
                                sx={{ width: 120, height: 120, borderRadius: '50%', border: '3px solid #fff', boxShadow: 2 }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1c1e21' }}>
                                {user.username}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" sx={{ fontSize: 14 }}>
                                {user.email}
                            </Typography>
                        </Grid>
                        <Divider sx={{ width: '100%', my: 2 }} />
                        {user.role === 'USER' && (
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1c1e21' }}>
                                    Vos Réservations
                                </Typography>
                                {reservations.length > 0 ? (
                                    <Grid container spacing={2}>
                                        {reservations.map((reservation) => (
                                            <Grid item xs={12} key={reservation.id}>
                                                <Card sx={{ p: 2, boxShadow: 2, borderRadius: 1 }}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{reservation.destination}</Typography>
                                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: 13 }}>{reservation.date}</Typography>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: 14 }}>
                                        Vous n'avez aucune réservation.
                                    </Typography>
                                )}
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    padding: '12px',
                                    boxShadow: 3,
                                    ':hover': {
                                        backgroundColor: '#1877f2',
                                        boxShadow: 6,
                                    }
                                }}
                                onClick={() => alert("Modifier Profil")}
                            >
                                Modifier Profil
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Profile;
