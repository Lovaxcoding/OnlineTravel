import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

const NotFound = () => {
    const navigate = useNavigate(); // Remplacer useHistory par useNavigate

    const handleRedirect = () => {
        navigate('/'); // Rediriger vers la page d'accueil
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Typography variant="h1" color="error" sx={{ fontWeight: 'bold' }}>
                    404
                </Typography>
                <Typography variant="h5" color="textSecondary" sx={{ marginBottom: 2 }}>
                    Oups, la page que vous cherchez n'existe pas.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRedirect}
                    sx={{ marginTop: 2 }}
                >
                    Retour à l'accueil
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;
