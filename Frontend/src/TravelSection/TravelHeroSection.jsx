import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import heroImage from "../assets/Images/Tailand.jpg";
import lagunaImage from "../assets/Images/Laguna.jpg";
import phuketImage from "../assets/Images/Phucket.jpg";

export default function TravelHeroSection() {
    return (
        <>
            {/* Hero Section */}
            <Box
                sx={{
                    height: "80vh",
                    backgroundImage: `url(${heroImage})`,
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
                }}
            >
                <Box sx={{ maxWidth: "50%" }}>
                    <Typography variant="h3" fontWeight="bold">
                        Journey with Happiness
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Embark on a journey filled with joy and wonder! Discover new places, serene landscapes, and hidden gems. Let happiness guide your travels.
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

            {/* Travel Blog Section */}
            <Container sx={{ my: 8 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Travel Blog In The World
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Welcome to our travel blog, your ultimate guide to exploring the wonders of the world!
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: "#28a745", color: "white" }}>Explore →</Button>

                {/* Blog Cards */}
                <Box sx={{ display: "flex", gap: 3, mt: 4, flexWrap : "wrap" }}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Box
                            sx={{
                                backgroundImage: `url(${lagunaImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: 250,
                                height: 300,
                                borderRadius: 4,
                                position: "relative",
                                color: "white",
                                display: "flex",
                                alignItems: "flex-end",
                                padding: 2,
                            }}
                        >
                            <Typography variant="h6">Laguna Beach</Typography>
                        </Box>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Box
                            sx={{
                                backgroundImage: `url(${phuketImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: 250,
                                height: 300,
                                borderRadius: 4,
                                position: "relative",
                                color: "white",
                                display: "flex",
                                alignItems: "flex-end",
                                padding: 2,
                            }}
                        >
                            <Typography variant="h6">Phuket Beaches</Typography>
                        </Box>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Box
                            sx={{
                                backgroundImage: `url(${phuketImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: 250,
                                height: 300,
                                borderRadius: 4,
                                position: "relative",
                                color: "white",
                                display: "flex",
                                alignItems: "flex-end",
                                padding: 2,
                            }}
                        >
                            <Typography variant="h6">Phuket Beaches</Typography>
                        </Box>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Box
                            sx={{
                                backgroundImage: `url(${phuketImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: 250,
                                height: 300,
                                borderRadius: 4,
                                position: "relative",
                                color: "white",
                                display: "flex",
                                alignItems: "flex-end",
                                padding: 2,
                            }}
                        >
                            <Typography variant="h6">Phuket Beaches</Typography>
                        </Box>
                    </motion.div>
                </Box>
            </Container>
        </>
    );
}
