import { Avatar, Button, Typography, Box } from "@mui/material";

export default function SignupSection() {
    return (
        <Box sx={{ color: "whitesmoke", py: 8,  textAlign: "center" }}>
            {/* Section principale */}
            <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 3 }}
            >
                Rendons cela <span style={{ color: "#dc2626" }}>officiel</span>, inscrivez-vous et accédez au coffre.
            </Typography>

            <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={3}>
                {/* Images des membres */}
                <Box display="flex" sx={{
                    "& img": { width: 40, height: 40, borderRadius: "50%", border: "2px solid white", ml: -1 }
                }}>
                    <Avatar src="/assets/images/user1.jpeg" alt="User 1" />
                    <Avatar src="/assets/images/user2.jpeg" alt="User 2" />
                    <Avatar src="/assets/images/user3.jpeg" alt="User 3" />
                </Box>
                <Typography color="whitesmoke">295+ personnes ont déja rejoins</Typography>
            </Box>

            <Button
                variant="contained"
                sx={{ bgcolor: "white", color: "black", px: 3, py: 1, borderRadius: "50px", fontWeight: "bold", "&:hover": { bgcolor: "#dc2626", color: "white" } }}
            >
                Book now
            </Button>
        </Box>
    );
}
