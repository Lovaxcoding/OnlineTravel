import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, CardActions,  TextField } from "@mui/material";
import { styled } from "@mui/system";
import { getDestination } from "../services/apiDestination";
import Grid from '@mui/material/Grid2';

// Style personnalisé pour la Card
const StyledCard = styled(Card)({
    maxWidth: 345,
    margin: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    '&:hover': {
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
    }
});

const TravelOfferCard = ({ destination }) => {
    const { id, description, price, background_image_path, name } = destination;

    return (
        <StyledCard key={id}>
            <CardMedia
                component="img"
                height="200"
                image={background_image_path || 'fallback_image_path.jpg'}
                alt={name}
                style={{ objectFit: "cover", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
            />
            <CardContent>
                <Typography variant="h6" component="div" color="primary" fontWeight="bold">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    {description}
                </Typography>
                <Typography variant="h6" component="div" color="green" fontWeight="bold">
                    {price} €
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: "center", alignItems: "center", margin: "10px"}}>
                <Button size="small" variant="contained" color="primary">
                    Réserver maintenant
                </Button>
            </CardActions>
        </StyledCard>
    );
};

const TravelOffers = () => {
    const [destinations, setDestinations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDestination, setFilteredDestination] = useState([]);
    const [showAll, setShowAll] = useState(false);  // Nouvel état pour afficher plus ou moins

    useEffect(() => {
        fetchDestinations();
    }, []);

    useEffect(() => {
        filterDestination();
    }, [searchTerm, destinations]);

    const filterDestination = () => {
        const filtered = destinations.filter((destination) => {
            return (
                destination.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                destination.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredDestination(filtered);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const fetchDestinations = async () => {
        try {
            const response = await getDestination();
            setDestinations(response);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleShowAll = () => {
        setShowAll((prevState) => !prevState);
    };

    return (
        <div style={{ py: 48, textAlign: "center", justifyContent : "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" fontWeight="bold" sx={{ marginTop: "4rem" }}>
                NOS OFFRES
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ maxWidth: "600px", margin: "auto", mt: 1 }}>
                "Découvrez des paysages à couper le souffle et vivez une aventure inoubliable à travers nos destinations de rêve !"
            </Typography>
            <TextField
                label="Rechercher par nom ou description"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-6"
                style={{ maxWidth: "400px", margin: "30px 0 0 0", display: "block" }}
            />

            {/* Utilisation du Grid pour la disposition */}
            <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                {(showAll ? filteredDestination : filteredDestination.slice(0, 3)).map((destination, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <TravelOfferCard destination={destination} />
                    </Grid>
                ))}
            </Grid>

            {/* Bouton "Voir plus" ou "Voir moins" */}
            <Button
                variant="contained"
                color="secondary"
                sx={{
                    marginTop: "2rem",
                    borderRadius: "30px",
                    padding: "8px 16px",
                    my:6,
                    fontWeight: "bold",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    '&:hover': {
                        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                    },
                }}
                onClick={toggleShowAll}
            >
                {showAll ? "Voir moins" : "Voir plus"}
            </Button>
        </div>
    );
};

export default TravelOffers;
