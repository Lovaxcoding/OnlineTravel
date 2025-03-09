import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import heroImage from "../assets/Images/Morondava.webp";
import lagunaImage from "../assets/Images/Laguna.jpg";
import phuketImage from "../assets/Images/Phucket.jpg";

export default function TravelHeroSection() {
    return (
        <>
            {/* Hero Section */}
            <Box
                sx={{
                    height: "80vh",
                    backgroundImage: `url(/assets/banner.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "left",
                    color: "white",
                    padding: 4,
                    position: "relative",
                    borderRadius: 4,
                    backdropFilter : "brightness(0.4)",
                    zIndex: 1
                }}
            >
                <Box sx={{ maxWidth: "50%" }}>
                    <Typography variant="h3" fontWeight="bold">
                        Voyagez avec le <span variant ="h5">Bonheur </span>
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Embarquez pour un voyage rempli de joie et de merveilles ! Découvrez de nouveaux endroits, des paysages sereins et des trésors cachés. Laissez le bonheur guider vos voyages.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            backgroundColor: "black",
                            color: "white",
                            px: 4,
                            py: 1,
                            borderRadius: 10,
                        }}
                    >
                        Try variety benefit using our service
                    </Button>
                </Box>
            </Box>
        </>
    );
}
