import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import img1 from "../assets/Images/Animation/1.jpg";
import img2 from "../assets/Images/Animation/2.jpg";
import img3 from "../assets/Images/Animation/3.jpg";
import img4 from "../assets/Images/Animation/4.jpg";

// Images pour le slideshow (ajoute plus d'images ici)
const images = [
    img1,
    img2,
    img3,
    img4
];

// Style personnalisé pour l'arrière-plan
const HeroContainer = styled(Box)({
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
});

// Overlay pour effet de flou
const Overlay = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Assombri pour mieux lire le texte
    zIndex: 1,
});

// Animation d'entrée
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

export default function HeroSection() {
    return (
        <>
            {/* Swiper pour le background */}
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                className="hero-swiper"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <HeroContainer sx={{
                            backgroundImage: `url(${img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
                            <Overlay />
                            <Container sx={{ position: "relative", zIndex: 2, color : "white" }}>
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
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
