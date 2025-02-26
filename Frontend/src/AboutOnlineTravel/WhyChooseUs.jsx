import { Box, Typography } from "@mui/material";
import { Star, People, VerifiedUser, EventAvailable } from "@mui/icons-material";
import Grid from '@mui/material/Grid2';

export default function WhyChooseUs() {
    return (
        <Box sx={{ textAlign: "center", py: 6, px: { xs: 2, md: 6 } }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Pourquoi Nous Choisir ?
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Star sx={{ fontSize: 50, color: "gold" }} />
                        <Typography variant="h5" fontWeight="bold">Fiabilité</Typography>
                        <Typography variant="body2">Un service reconnu et fiable.</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <People sx={{ fontSize: 50, color: "lightblue" }} />
                        <Typography variant="h5" fontWeight="bold">10,000+</Typography>
                        <Typography variant="body2">Clients satisfaits</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <EventAvailable sx={{ fontSize: 50, color: "green" }} />
                        <Typography variant="h5" fontWeight="bold">5+</Typography>
                        <Typography variant="body2">Années de service</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <VerifiedUser sx={{ fontSize: 50, color: "purple" }} />
                        <Typography variant="h5" fontWeight="bold">100%</Typography>
                        <Typography variant="body2">Sécurité et confiance</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
