import React, { useState } from "react";
import { addReservation } from "../services/apiReservation.jsx";
import { TextField, Button, Container, Typography } from "@mui/material";

const ReservationForm = ({ refresh }) => {
    const [destination, setDestination] = useState("");
    const [dateDepart, setDateDepart] = useState("");
    const [dateRetour, setDateRetour] = useState("");
    const [nombrePersonnes, setNombrePersonnes] = useState(1);
    const [prixTotal, setPrixTotal] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addReservation({ destination, dateDepart, dateRetour, nombrePersonnes, prixTotal });
        setDestination("");
        setDateDepart("");
        setDateRetour("");
        setNombrePersonnes(1);
        setPrixTotal("");
        refresh(); // Rafraîchir la liste
    };

    return (
        <Container>
            <Typography variant="h5">Ajouter une réservation</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} fullWidth required />
                <TextField label="Date de départ" type="date" value={dateDepart} onChange={(e) => setDateDepart(e.target.value)} fullWidth required InputLabelProps={{ shrink: true }} />
                <TextField label="Date de retour" type="date" value={dateRetour} onChange={(e) => setDateRetour(e.target.value)} fullWidth required InputLabelProps={{ shrink: true }} />
                <TextField label="Nombre de personnes" type="number" value={nombrePersonnes} onChange={(e) => setNombrePersonnes(e.target.value)} fullWidth required />
                <TextField label="Prix Total (€)" type="number" value={prixTotal} onChange={(e) => setPrixTotal(e.target.value)} fullWidth required />
                <Button type="submit" variant="contained" color="primary">Ajouter</Button>
            </form>
        </Container>
    );
};

export default ReservationForm;
