import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import mahajanga from "../assets/Images/mahajanga.jpg";
import toliara from "../assets/Images/toliara.jpg";
import fianarantsoa from "../assets/Images/fianarantsoa.jpg";
import isalo from "../assets/Images/isalo.webp";
import diego from "../assets/Images/antananarivo.jpg";


const destinations = [
    { name: "Mahajanga", image: mahajanga },
    { name: "Toliara", image: toliara },
    { name: "Fianarantsoa", image: fianarantsoa },
    { name: "Isalo", image: isalo },
    { name: "Diego", image: diego },
];
const DestinationsSwiper = () => {
    return (
        <Box sx={{ textAlign: "center", py: 5 , marginTop: "10vh", marginBottom :"10vh", height: "auto", display : "flex", flexDirection : "Column", justifyContent : "center", alignItems : "center"}}>
            {/* Titre */}
            <Typography variant="h4" fontWeight="bold" sx={{marginTop : "4rem"}}>
                NOS DESTINATIONS
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ maxWidth: "600px", margin: "auto", mt: 1 }}>
                "Découvrez des paysages à couper le souffle et vivez une aventure inoubliable à travers nos destinations de rêve !"
            </Typography>

            {/* Swiper */}
            <Swiper
                modules={[EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                loop={true}

                coverflowEffect={{
                    rotate: 0,
                    stretch: 50,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                }}
                style={{ maxWidth: "80vw", height: "450px", marginTop: "30px" }}
            >
                {destinations.map((destination, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                background: `url(${destination.image}) center/cover no-repeat`,
                                borderRadius: "20px",
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "center",
                                p: 3,
                                color: "white",
                                fontSize: "24px",
                                fontWeight: "bold",
                                textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                            }}
                        >
                            {destination.name}
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default DestinationsSwiper;
