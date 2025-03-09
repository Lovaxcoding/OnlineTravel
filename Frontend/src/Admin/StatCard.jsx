import { Card, CardContent, Typography, Grid } from "@mui/material";

const StatsCard = ({ title, value }) => {
    return (
        <Card sx={{ minWidth: 200, background: "#1E1E2F", color: "#FFF", textAlign: "center", boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>{value}</Typography>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
