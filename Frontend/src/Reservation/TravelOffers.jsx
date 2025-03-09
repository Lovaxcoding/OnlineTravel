import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, TextField,} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { styled } from "@mui/system";
import { getDestination } from "../services/apiDestination";
import { useNavigate } from "react-router-dom";

// Style personnalisé pour la Card
const StyledCard = styled(Card)({
    maxWidth: 345,
    margin: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    '&:hover': {
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
    }
});

const TravelOfferCard = ({ destination }) => {
    const { id, description, price, background_image_path, name } = destination;
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(`Navigation vers : /destinations/${id}`); // Vérification en console
        navigate(`/destinations/${id}`);
    };

    return (
        <StyledCard onClick={handleClick}>
            <CardMedia
                component="img"
                height="200"
                image={background_image_path || "fallback_image.jpg"}
                alt={name}
                style={{ objectFit: "cover" }}
            />
            <CardContent>
                <Typography variant="h6" fontWeight="bold">{name}</Typography>
                <Typography variant="body2" color="text.secondary">{description}</Typography>
                <Typography variant="h6" color="green" fontWeight="bold">{price} €</Typography>
            </CardContent>
        </StyledCard>
    );
};

const TravelOffers = () => {
    const [destinations, setDestinations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetchDestinations();
    }, []);

    useEffect(() => {
        filterDestinations();
    }, [searchTerm, destinations]);

    const filterDestinations = () => {
        const filtered = destinations.filter((destination) => {
            return (
                destination.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                destination.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredDestinations(filtered);
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
        <div style={{ padding: "48px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                style={{ maxWidth: "400px", marginTop: "30px" }}
            />

            {/* Affichage des cartes */}
            <Grid container spacing={3} sx={{ justifyContent: "center", marginTop: "2rem" }}>
                {(showAll ? filteredDestinations : filteredDestinations.slice(0, 3)).map((destination, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <TravelOfferCard destination={destination} />
                    </Grid>
                ))}
            </Grid>

            {/* Bouton "Voir plus" ou "Voir moins" */}
            {filteredDestinations.length > 3 && (
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                        marginTop: "2rem",
                        borderRadius: "30px",
                        padding: "8px 16px",
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
            )}
        </div>
    );
};

export default TravelOffers;
