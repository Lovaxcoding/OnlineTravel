import React, { useState } from 'react';
import {
    Stepper, Step, StepLabel, TextField, Button, Box, Typography,
    FormControl, InputLabel, Select, MenuItem, Container, Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {Link} from "react-router-dom";
import {addUser} from "../services/apiUser.jsx";
import Swal from "sweetalert2";

const RegisterFormWithStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        email: '',
        telephone: '',
        username: '',
        password: '',
        role: 'USER'
    });

    const steps = ['Informations personnelles', 'Identifiants', 'Rôle'];

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Log des données du formulaire
        try{
            addUser(formData).then(r => console.log(r));
            Swal.fire({
                icon: "success",
                title: "Success",
                message: "Vous êtes à présent membre authentifié",
            })
        }
        catch(err){
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                message: "Une erreur s'est survenu, veuillez réessayer plus tard",

            })
        }
    };

    return (
        <Container maxWidth="xs" justifycontent="center" position = "relative" alignitems="center" style={{ minHeight: "100vh",  width : "80%"}}>
            <Paper elevation={3} sx={{ padding: 6 , borderRadius: '25px', mt: 8 , height : "90vh", position : "relative", display : "flex", justifyContent: "center" , alignItems: "center" , flexDirection : "column"}}>
                <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: '#004C8C', marginBottom: 4 }}>
                    Inscription
                </Typography>
                <Typography variant="p" align="center" sx={{ fontWeight: 400, color: '#1E1E1E', marginBottom: 4, fontFamily : "Space Grotek, sans-serif" }}>
                    Suivez ces étapes simples pour compléter votre inscription et rejoindre notre plateforme. Chaque étape vous guidera pour saisir les informations nécessaires de manière rapide et sécurisée
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel sx={{ fontSize: '16px', fontWeight: 'bold' }}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <form onSubmit={handleSubmit}>
                    {activeStep === 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px',
                                                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
                                            },
                                            '& .MuiInputLabel-root': { color: '#004C8C' }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Téléphone"
                                        variant="outlined"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px',
                                                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
                                            },
                                            '& .MuiInputLabel-root': { color: '#004C8C' }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {activeStep === 1 && (
                        <Box sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nom d'utilisateur"
                                        variant="outlined"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px',
                                                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
                                            },
                                            '& .MuiInputLabel-root': { color: '#004C8C' }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Mot de passe"
                                        type="password"
                                        variant="outlined"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px',
                                                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
                                            },
                                            '& .MuiInputLabel-root': { color: '#004C8C' }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {activeStep === 2 && (
                        <Box sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>

                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            name="role"
                                            value={formData.role}
                                            inputProps={{ readOnly: true }}
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px',
                                                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
                                                },
                                                '& .MuiInputLabel-root': { color: '#004C8C' }
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    <Box sx={{ mt: 3 , display : "flex", justifyContent : "space-between"}}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                            sx={{
                                mr: 2,
                                borderRadius: '20px',
                                padding: '10px 20px',
                                borderColor: '#004C8C',
                                '&:hover': { borderColor: '#004C8C', backgroundColor: '#e5f4ff' }
                            }}
                        >
                            Précédent
                        </Button>

                        {activeStep === steps.length - 1 ? (
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{
                                    borderRadius: '20px',
                                    padding: '10px 20px',
                                    backgroundColor: '#004C8C',
                                    '&:hover': { backgroundColor: '#003c7a' }
                                }}
                            >
                                S'inscrire
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                sx={{
                                    borderRadius: '20px',
                                    padding: '10px 20px',
                                    backgroundColor: '#004C8C',
                                    '&:hover': { backgroundColor: '#003c7a' }
                                }}
                            >
                                Suivant
                            </Button>
                        )}
                    </Box>
                    <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="textSecondary">
                            Avez-vous déjà un compte ? <Link to="/login">Connectez-vous</Link>
                        </Typography>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default RegisterFormWithStepper;
