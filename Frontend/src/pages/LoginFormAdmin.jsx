import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Paper, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { AuthContext } from "../Context/AuthContext.jsx";
import { login } from "../services/authService.js";
import axios from "axios";
import Swal from "sweetalert2";
import axiosInstance from "../services/axios.js";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

const LoginFormAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login: contextLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State pour afficher/masquer le mot de passe
    const [searchParams] = useSearchParams();
    const destinationId = searchParams.get('destination'); // Récupère l'ID depuis l'URL


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        try {
            const response = await axiosInstance.post('/auth/login', {
                email: email,
                password: password
            });

            if (response.status === 200 && response.data.message === "Connexion réussie!") {
                console.log("Login success!");
                localStorage.setItem("user", JSON.stringify(response.data.user));
                contextLogin(response.data.user);
                const userId = response.data.user.id;
                navigate(`/dashboard`)
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Identifiants incorrects!',
                    text: 'Veuillez vérifier votre email et mot de passe.',
                });
            } else {
                console.error("Erreur serveur :", error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Erreur de connexion',
                    text: 'Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.',
                });
            }
        }
    };



    const handleClickShowPassword = () => {
        setShowPassword(!showPassword); // Bascule entre afficher et masquer le mot de passe
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
            <Grid item xs={12} sm={8} md={4}>
                <Paper elevation={3} sx={{ padding: 6 , borderRadius: '25px'}}>
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
                                error={!!error}
                                helperText={error && "L'email est requis"}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px',
                                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
                                    },
                                    '& .MuiInputLabel-root': { color: '#004C8C' }
                                }}
                            />
                        </Box>

                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px',
                                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
                                    },
                                    '& .MuiInputLabel-root': { color: '#004C8C' }
                                }}
                                label="Mot de passe"
                                type={showPassword ? "text" : "password"} // Change le type en fonction de `showPassword`
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!error}
                                helperText={error && "Le mot de passe est requis"}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />} {/* Affiche l'icône en fonction de `showPassword` */}
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
                        >
                            Se connecter
                        </Button>
                    </form>
                    <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="textSecondary">
                            Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LoginFormAdmin;
