import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import heroImage from "../assets/Images/28871708494da87a59a55cbaad269d2f.jpg"

// Style personnalisé pour l'arrière-plan
const HeroContainer = styled(Box)({
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundImage: `url(${heroImage})`, // Image aléatoire
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    position: "relative",
});

// Overlay pour effet de flou
const Overlay = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Assombri pour mieux lire le texte
});

// Animation d'entrée
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

export default function HeroSection() {
    return (
        <>
            {/* Section Hero */}
            <HeroContainer>
                <Overlay />
                <Container>
                    <MotionTypography
                        variant="h2"
                        fontWeight="bold"
                        component="h1"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Explorez le Monde avec Nous
                    </MotionTypography>
                    <Typography variant="h5" sx={{ mt: 2 }}>
                        Des aventures inoubliables vous attendent !
                    </Typography>
                    <MotionButton
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, fontSize: "1.2rem", px: 4, py: 1 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Découvrir
                    </MotionButton>
                </Container>
            </HeroContainer>
        </>
    );
}
