import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Paper, Box, IconButton, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { AuthContext } from "../Context/AuthContext.jsx";
import Swal from "sweetalert2";
import axiosInstance from "../services/axios.js";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPageUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login: contextLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        setLoading(true); // Active le loader
        setError('');

        try {
            const response = await axiosInstance.post('/auth/login', { email, password });

            if (response.status === 200 && response.data.message === "Connexion réussie!") {
                console.log("Login success!");
                localStorage.setItem("user", JSON.stringify(response.data.user));
                console.log(localStorage.getItem("user"));
                contextLogin(response.data.user);
                navigate(`/`);
            }
        } catch (error) {
            setError("Identifiants incorrects. Veuillez réessayer.");
            await Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Email ou mot de passe incorrect.',
            });
        } finally {
            setLoading(false); // Désactive le loader
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
            <Grid item xs={12} sm={8} md={4}>
                <Paper elevation={3} sx={{ padding: 6, borderRadius: '25px' }}>
                    <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: '#004C8C', marginBottom: 4 }}>
                        Se connecter
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                sx={{ borderRadius: '10px' }}
                            />
                        </Box>

                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                label="Mot de passe"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Box>

                        {error && (
                            <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2 }}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ padding: '10px' }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Se connecter"}
                        </Button>
                    </form>

                    <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                        <Typography variant="body2">
                            Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LoginPageUser;
