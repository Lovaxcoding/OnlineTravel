import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
    Grid, Card, Avatar, Typography, Divider, Button, CircularProgress, Box, Drawer,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton
} from "@mui/material";
import { Circle, Phone, Email, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";

const ProfileToggleDrawer = ({ open, toggle }) => {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReservations, setShowReservations] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({ username: "", email: "", telephone: "", password: "" });
    const [errors, setErrors] = useState({ username: "", email: "", telephone: "", password: "" });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserId(user.id);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!userId) return;

        axios.get(`http://localhost:8080/api/v1/user/${userId}`)
            .then(response => {
                setUser(response.data);
                setFormData({
                    username: response.data.username || '',
                    email: response.data.email || '',
                    telephone: response.data.telephone || '',
                    password: response.data.password || '',
                });
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur lors du chargement de l'utilisateur :", error);
                setLoading(false);
            });
    }, [userId]);

    useEffect(() => {
        if (!userId || (user && user.role !== "USER")) return;

        axios.get(`http://localhost:8080/api/v1/reservations?userId=${userId}`)
            .then(response => setReservations(response.data))
            .catch(error => console.error("Erreur lors du chargement des réservations :", error));
    }, [userId, user]);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.username) {
            newErrors.username = "Le nom d'utilisateur est requis.";
            isValid = false;
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "L'email est invalide.";
            isValid = false;
        }

        if (!formData.telephone) {
            newErrors.telephone = "Le numéro de téléphone est requis.";
            isValid = false;
        }

        if (formData.password && formData.password.length < 6) {
            newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) return;

        if (!validateForm()) {
            return;
        }

        axios.put(`http://localhost:8080/api/v1/user/${user.id}`, formData)
            .then(response => {
                setUser(response.data);
                setOpenDialog(false);
                Swal.fire({
                    title: 'Succès',
                    text: 'Profil mis à jour avec succès',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour du profil :", error);
                Swal.fire({
                    title: 'Erreur',
                    text: "Une erreur est survenue lors de la mise à jour du profil.",
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
    };

    if (loading) return <CircularProgress size={50} sx={{ display: "block", margin: "auto" }} />;

    return (
        <Drawer anchor="right" open={open} onClose={toggle}>
            <Box sx={{ width: 400, padding: 3, backgroundColor: "#f7f7f7" }}>
                <Grid container spacing={2} direction="column" alignItems="center">
                    {user ? (
                        <>
                            <Grid item>
                                <Avatar
                                    alt={user.username}
                                    src={user.avatar || "/default-avatar.png"}
                                    sx={{
                                        width: 120, height: 120, borderRadius: "50%", border: "3px solid #fff", boxShadow: 2, transition: "0.3s",
                                        "&:hover": { transform: "scale(1.05)", cursor: "pointer" }
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1c1e21", display: "flex", alignItems: "center" }}>
                                    {user.username}
                                    <Circle sx={{ fontSize: 18, color: "green", marginLeft: 2 }} />
                                </Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ display: "flex", alignItems: "center" }}>
                                    <Email sx={{ fontSize: 18, marginRight: 1 }} />
                                    {user.email}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ display: "flex", alignItems: "center" }}>
                                    <Phone sx={{ fontSize: 18, marginRight: 1 }} />
                                    {user.telephone}
                                </Typography>
                            </Grid>
                            <Divider sx={{ width: "100%", my: 2 }} />
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" fullWidth startIcon={<Edit />} onClick={handleOpenDialog}>
                                    Modifier Profil
                                </Button>
                            </Grid>
                            {user.role === "USER" && (
                                <Grid item xs={12} sx={{ marginTop: 2 }}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => setShowReservations(!showReservations)}
                                        sx={{ marginBottom: 2, width: "100%" }}
                                    >
                                        {showReservations ? "Masquer Réservations" : "Afficher Réservations"}
                                    </Button>
                                    {showReservations && (
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1c1e21" }}>
                                                Vos Réservations
                                            </Typography>
                                            {reservations.length > 0 ? (
                                                <Grid container spacing={2}>
                                                    {reservations.map((reservation) => (
                                                        <Grid item xs={12} sm={6} key={reservation.id}>
                                                            <Card sx={{ p: 2, boxShadow: 2, borderRadius: 1, backgroundColor: "#fff" }}>
                                                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                                                    {reservation.destination}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary">
                                                                    {reservation.date}
                                                                </Typography>
                                                            </Card>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            ) : (
                                                <Typography variant="body2" color="textSecondary">
                                                    Vous n'avez aucune réservation.
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                </Grid>
                            )}
                        </>
                    ) : (
                        <Typography variant="body1" sx={{ textAlign: "center", fontWeight: "bold" }}>
                            Aucune information utilisateur.
                        </Typography>
                    )}
                </Grid>
            </Box>
            {/* Dialog pour la modification du profil */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Modifier le Profil</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nom d'utilisateur"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            error={!!errors.username}
                            helperText={errors.username}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            label="Téléphone"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            error={!!errors.telephone}
                            helperText={errors.telephone}
                        />
                        <TextField
                            label="Mot de passe (facultatif)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="secondary">Annuler</Button>
                            <Button type="submit" color="primary">Sauvegarder</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </Drawer>
    );
};

export default ProfileToggleDrawer;
