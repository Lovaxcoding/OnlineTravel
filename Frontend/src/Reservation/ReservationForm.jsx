import React, { useState } from "react";
import { addReservation } from "../services/apiReservation.jsx";
import { TextField, Button, Container, Typography, Stepper, Step, StepLabel, Box, IconButton, Autocomplete, Card, CardContent } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import Swal from "sweetalert2";
import { addUser } from "../services/apiUser.jsx";

const steps = [
    "Information utilisateur",
    "Dates et lieu de réservation",
    "Détails de la réservation",
    "Récapitulatif"
];

const villesMadagascar = [
    "Antananarivo", "Toamasina", "Antsirabe", "Fianarantsoa", "Mahajanga",
    "Toliara", "Antsiranana", "Morondava", "Manakara", "Sambava",
    "Nosy Be", "Farafangana", "Ambositra", "Hell-Ville", "Ambanja"
];

const tarifsVoyages = {
    "Antananarivo": 46,
    "Toamasina": 50,
    "Antsirabe": 40,
    "Fianarantsoa": 55,
    "Mahajanga": 60,
    "Toliara": 65,
    "Antsiranana": 70,
    "Morondava": 45,
    "Manakara": 50,
    "Sambava": 75,
    "Nosy Be": 80,
    "Farafangana": 55,
    "Ambositra": 42,
    "Hell-Ville": 78,
    "Ambanja": 73
};

const ReservationForm = ({ refresh }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [destination, setDestination] = useState("");
    const [dateDepart, setDateDepart] = useState("");
    const [dateRetour, setDateRetour] = useState("");
    const [nombrePersonnes, setNombrePersonnes] = useState(1);
    const [prixTotal, setPrixTotal] = useState("");

    const handleNext = () => {
        if (activeStep === 1) {
            handleCalculation(destination, dateDepart, dateRetour, nombrePersonnes);
        }
        if (activeStep === steps.length - 1) {
            handleSubmit(new Event("submit"));
            setActiveStep(0);
        }
        else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleCalculation = (destination, dateDepart, dateRetour, nombrePersonnes) => {
        if (!destination || !dateDepart || !dateRetour || nombrePersonnes < 1) {
            setPrixTotal("");
            return;
        }
        const prixUnitaire = tarifsVoyages[destination] || 0;
        const depart = new Date(dateDepart);
        const retour = new Date(dateRetour);
        const diffJours = Math.max(1, (retour - depart) / (1000 * 60 * 60 * 24));
        const total = prixUnitaire * diffJours * nombrePersonnes;
        setPrixTotal(total.toFixed(2));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!destination || !dateDepart || !dateRetour || nombrePersonnes < 1 || !username || !email || !telephone) {
            Swal.fire({
                title: "Erreur !",
                text: "Veuillez remplir tous les champs avant de soumettre.",
                icon: "error",
                confirmButtonText: "Réessayer",
            });
            return;
        }

        try {
            await addReservation({ destination, dateDepart, dateRetour, nombrePersonnes, prixTotal });
            await addUser({ username, email, telephone });

            Swal.fire({
                title: "Réservation ajoutée !",
                text: `Votre réservation a été enregistrée avec succès avec un budget de ${prixTotal} Euros`,
                icon: "success",
                confirmButtonText: "OK",
            });

            setDestination("");
            setDateDepart("");
            setDateRetour("");
            setNombrePersonnes(1);
            setPrixTotal("");
            setName("");
            setEmail("");
            setTelephone("");

            if (typeof refresh === "function") {
                refresh();
            }
        } catch (error) {
            Swal.fire({
                title: "Erreur !",
                text: "Une erreur s'est produite lors de l'ajout de la réservation.",
                icon: "error",
                confirmButtonText: "Réessayer",
            });
        }
    };

    return (
        <Container maxWidth="sm" sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80vh",
        }}>
            <Typography variant="h5" align="center" gutterBottom>
                Reservez dès maintenant !
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <form onSubmit={handleSubmit}>
                <Box sx={{ padding: 2 }}>
                    {activeStep === 0 && (
                        <div>
                            <TextField label="Votre nom et prénom" value={username} onChange={(e) => setName(e.target.value)} fullWidth required margin="normal" />
                            <TextField label="Votre email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required margin="normal" />
                            <TextField label="Votre Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} fullWidth required margin="normal" />
                        </div>
                    )}

                    {activeStep === 1 && (
                        <div>
                            <Autocomplete
                                options={villesMadagascar}
                                value={destination}
                                onChange={(event, newValue) => {
                                    setDestination(newValue);
                                    handleCalculation(newValue, dateDepart, dateRetour, nombrePersonnes);
                                }}
                                disableClearable
                                freeSolo={false}
                                renderInput={(params) => <TextField {...params} label="Destination" fullWidth required margin="normal" />}
                            />
                            <TextField label="Date de départ" type="date" value={dateDepart} onChange={(e) => { setDateDepart(e.target.value); handleCalculation(destination, e.target.value, dateRetour, nombrePersonnes); }} fullWidth required InputLabelProps={{ shrink: true }} margin="normal" />
                            <TextField label="Date de retour" type="date" value={dateRetour} onChange={(e) => { setDateRetour(e.target.value); handleCalculation(destination, dateDepart, e.target.value, nombrePersonnes); }} fullWidth required InputLabelProps={{ shrink: true }} margin="normal" />
                        </div>
                    )}

                    {activeStep === 2 && (
                        <div>
                            <TextField label="Nombre de personnes" type="number" value={nombrePersonnes} onChange={(e) => { const newNombrePersonnes = parseInt(e.target.value, 10) || 1; setNombrePersonnes(newNombrePersonnes); handleCalculation(destination, dateDepart, dateRetour, newNombrePersonnes); }} fullWidth required margin="normal" />
                            <TextField label="Prix Total (€)" type="number" value={prixTotal} fullWidth required margin="normal" InputProps={{ readOnly: true }} />
                        </div>
                    )}

                    {activeStep === 3 && (
                        <div>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Récapitulatif de la réservation</Typography>
                                    <Typography><strong>Nom:</strong> {username}</Typography>
                                    <Typography><strong>Email:</strong> {email}</Typography>
                                    <Typography><strong>Téléphone:</strong> {telephone}</Typography>
                                    <Typography><strong>Destination:</strong> {destination}</Typography>
                                    <Typography><strong>Date de départ:</strong> {dateDepart}</Typography>
                                    <Typography><strong>Date de retour:</strong> {dateRetour}</Typography>
                                    <Typography><strong>Nombre de personnes:</strong> {nombrePersonnes}</Typography>
                                    <Typography><strong>Prix Total:</strong> {prixTotal} €</Typography>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleBack} disabled={activeStep === 0} startIcon={<ArrowBack />}>
                            Précédent
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext} endIcon={<ArrowForward />}>
                            {activeStep === steps.length - 1 ? "Terminer" : "Suivant"}
                        </Button>
                    </Box>
                </Box>
            </form>
        </Container>
    );
};

export default ReservationForm;
