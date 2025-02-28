import { Box, Typography, Paper } from "@mui/material";
import { Star, People, VerifiedUser, EventAvailable } from "@mui/icons-material";
import Grid from '@mui/material/Grid2';

export default function WhyChooseUs() {
    return (
        <Box
            sx={{
                height: "auto",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                py: 24,
                px: { xs: 2, md: 6 },
                background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                borderRadius: "10px"
            }}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ fontFamily: "Roboto, sans-serif", color: "primary.main", marginBottom : "4rem" }}
            >
                Pourquoi Nous Choisir ?
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: 4,
                            borderRadius: "15px",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            '&:hover': {
                                transform: "translateY(-10px)",
                                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)"
                            }
                        }}
                    >
                        <Star sx={{ fontSize: 60, color: "gold", marginBottom: 2 }} />
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                            Fiabilité
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
                            Un service reconnu et fiable.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: 4,
                            borderRadius: "15px",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            '&:hover': {
                                transform: "translateY(-10px)",
                                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)"
                            }
                        }}
                    >
                        <People sx={{ fontSize: 60, color: "lightblue", marginBottom: 2 }} />
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                            10,000+
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
                            Clients satisfaits
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: 4,
                            borderRadius: "15px",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            '&:hover': {
                                transform: "translateY(-10px)",
                                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)"
                            }
                        }}
                    >
                        <EventAvailable sx={{ fontSize: 60, color: "green", marginBottom: 2 }} />
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                            5+
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
                            Années de service
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: 4,
                            borderRadius: "15px",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            '&:hover': {
                                transform: "translateY(-10px)",
                                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)"
                            }
                        }}
                    >
                        <VerifiedUser sx={{ fontSize: 60, color: "purple", marginBottom: 2 }} />
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                            100%
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1rem" }}>
                            Sécurité et confiance
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
