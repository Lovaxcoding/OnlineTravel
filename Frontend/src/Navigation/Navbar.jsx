import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { styled } from "@mui/system";

const Navbar = () => {
    return (
        <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "white", color: "black" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                {/* Logo */}
                <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1rem" }}>
                    Onlive <span style={{ fontWeight: "300" }}>Travel</span>
                </Typography>

                {/* Menu */}
                <Box sx={{ display: "flex", gap: 4 }}>
                    <Typography variant="body1" sx={{ cursor: "pointer", fontSize: "0.8rem" }}>Home</Typography>
                    <Typography variant="body1" sx={{ cursor: "pointer", fontSize: "0.8rem" }}>Destination</Typography>
                    <Typography variant="body1" sx={{ cursor: "pointer", fontSize: "0.8rem" }}>Offre</Typography>
                    <Typography variant="body1" sx={{ cursor: "pointer", fontSize: "0.8rem" }}>Location</Typography>
                </Box>

                {/* Téléphone & Bouton */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", color: "gray" }}>
                        <PhoneIcon sx={{ fontSize: "0.8rem", marginRight: "5px" }} />
                        <Typography variant="body1">034 38 145 56</Typography>
                    </Box>
                    <Button variant="contained" sx={{ backgroundColor: "#2d7f96", color: "white", fontWeight: "bold",fontSize: "0.8rem", borderRadius: "5px", textTransform: "none" }}>
                        Obtenir devis
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
