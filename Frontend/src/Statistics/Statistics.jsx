import { Container } from "@mui/material";
import Grid from '@mui/material/Grid2'
import StatsCard from "../admin/StatCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    { name: "Jan", réservations: 10, revenus: 4000 },
    { name: "Fév", réservations: 15, revenus: 6000 },
    { name: "Mars", réservations: 20, revenus: 8000 },
    { name: "Avr", réservations: 25, revenus: 10000 },
    { name: "Mai", réservations: 30, revenus: 12000 },
];

const Statistics = () => {
    return (
        <Container>
            <h1>Statistiques</h1>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <StatsCard title="Total Réservations" value="150" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatsCard title="Revenu Total (€)" value="45 000" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatsCard title="Clients Uniques" value="120" />
                </Grid>
            </Grid>

            <h2>Évolution des réservations</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="réservations" fill="#8884d8" />
                    <Bar dataKey="revenus" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </Container>
    );
};

export default Statistics;
