import React, { useEffect, useState } from "react";
import { getReservations, deleteReservation } from "../services/apiReservation.jsx";
import { Button, List, ListItem, ListItemText, Typography } from "@mui/material";

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await getReservations();
            setReservations(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
        }
    };

    const handleDelete = async (id) => {
        await deleteReservation(id);
        fetchReservations(); // Rafraîchir la liste après suppression
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Liste des Réservations</Typography>
            <List>
                {reservations.map((res) => (
                    <ListItem key={res.idReservation} divider>
                        <ListItemText
                            primary={`Destination : ${res.destination}`}
                            secondary={`Départ: ${res.dateDepart} | Retour: ${res.dateRetour} | Prix: ${res.prixTotal}€`}
                        />
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(res.idReservation)}>
                            Supprimer
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ReservationList;
