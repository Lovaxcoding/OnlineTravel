import {Box, Typography, TextField, Button, IconButton, Link} from "@mui/material";
import { Instagram, WhatsApp, YouTube, Telegram, Twitter } from "@mui/icons-material";
import Grid from '@mui/material/Grid2';
import SignupSection from "./SignupSection.jsx";

export default function Footer() {
    return (
        <Box sx={{ height: "auto", backgroundColor: "#0A0A0A", color: "white", py: 6, px: { xs: 2, md: 6 } }}>
            <SignupSection />
            <Grid container spacing={4}>
                {/* Section Logo et Description */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" fontWeight="bold">Online <span>TRAVEL</span></Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Nous visons à offrir aux explorateurs modernes des sacs innovants, fonctionnels et élégants qui enrichissent chaque voyage.
                    </Typography>
                </Grid>

                {/* Section Liens */}
                <Grid item xs={6} md={2}>
                    <Typography variant="subtitle1" fontWeight="bold">About</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        <Link to="/about" style={{ textDecoration: "none", color: "white", cursor : "pointer" }}>About Us</Link>
                    </Typography>
                    <Typography variant="body2">Blog</Typography>
                    <Typography variant="body2">Career</Typography>
                    <Typography variant="body2">Travel Articles</Typography>
                </Grid>
                <Grid item xs={6} md={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Support</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>FAQs</Typography>
                    <Typography variant="body2">Manage Your Trips</Typography>
                    <Typography variant="body2">Contact Customer Service</Typography>
                    <Typography variant="body2">Safety Resource Center</Typography>
                </Grid>

                {/* Section Newsletter */}
                <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" fontWeight="bold">Get Updates</Typography>
                    <Box sx={{ display: "flex", position : "relative", mt: 2 }}>
                        <TextField placeholder="Enter Your Email" variant="outlined" size="small" sx={{ bgcolor: "white", flex: 1, borderRadius: 1 }} />
                        <Button variant="contained" sx={{ ml: 1, bgcolor: "#ffffff", color: "black" }}>Subscribe</Button>
                    </Box>
                    {/* Icônes des réseaux sociaux */}
                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                        <IconButton color="inherit"><Instagram /></IconButton>
                        <IconButton color="inherit"><WhatsApp /></IconButton>
                        <IconButton color="inherit"><YouTube /></IconButton>
                        <IconButton color="inherit"><Telegram /></IconButton>
                        <IconButton color="inherit"><Twitter /></IconButton>
                    </Box>
                </Grid>
            </Grid>

            {/* Footer Bas */}
            <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="body2">© 2024 Lovasoa Nantenaina . All rights reserved.</Typography>
                <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 2 }}>
                    <Typography variant="body2">Privacy Policy</Typography>
                    <Typography variant="body2">Terms of Service</Typography>
                </Box>
            </Box>
        </Box>
    );
}
