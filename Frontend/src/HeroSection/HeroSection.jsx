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

// Liste d'images pour le diaporama
const images = [img1, img2, img3, img4];

// Styles personnalisés
const HeroContainer = styled(Box)({
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Space Grotesk', sans-serif",

});

const Overlay = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Pour lisibilité du texte
    zIndex: 1,
});

const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

export default function HeroSection() {
    return (
        <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            className="hero-swiper"
        >
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                    <HeroContainer sx={{ backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", }}>
                        <Overlay />
                        <Container sx={{ position: "relative", zIndex: 5, color: "white", maxWidth: 800 }}>
                            <MotionTypography
                                variant="h3"
                                fontWeight="bold"
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                Explore the World Through My Lens
                            </MotionTypography>

                            <Typography variant="h6" sx={{ mt: 2, color: "#f0f0f0", fontWeight: 300 }}>
                                Discover breathtaking moments and landscapes captured in an artistic symphony. Let yourself be carried away by the magic of nature!
                            </Typography>

                            <MotionButton
                                variant="contained"
                                sx={{
                                    mt: 4,
                                    backgroundColor: "orange",
                                    fontSize: "1rem",
                                    textTransform: "none",
                                    borderRadius: "50px",
                                    padding: "12px 24px",
                                    "&:hover": { backgroundColor: "darkorange" },
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                See the Magic ⬇
                            </MotionButton>
                        </Container>
                    </HeroContainer>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
