import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { addReservation } from "../services/apiReservation";
import { getDestinationById } from "../services/apiDestination";
import { TextField, Button, Container, Typography, Stepper, Step, StepLabel, Box, Card, CardContent, Autocomplete } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import Swal from "sweetalert2";

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
    "Antananarivo": 46, "Toamasina": 50, "Antsirabe": 40, "Fianarantsoa": 55, "Mahajanga": 60,
    "Toliara": 65, "Antsiranana": 70, "Morondava": 45, "Manakara": 50, "Sambava": 75,
    "Nosy Be": 80, "Farafangana": 55, "Ambositra": 42, "Hell-Ville": 78, "Ambanja": 73
};

const ReservationForm = ({ refresh }) => {
    const [searchParams] = useSearchParams();
    const destinationId = searchParams.get("destination");
    const [userId, setUserId] = useState("");
    const defaultDestination = searchParams.get("destination") || "";

    const [activeStep, setActiveStep] = useState(0);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [destination, setDestination] = useState(defaultDestination);
    const [dateDepart, setDateDepart] = useState("");
    const [dateRetour, setDateRetour] = useState("");
    const [nombrePersonnes, setNombrePersonnes] = useState(1);
    const [prixTotal, setPrixTotal] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
            setTelephone(user.telephone);
            setUserId(user.id);
        }

        if (destinationId) {
            getDestinationById(destinationId).then((dest) => {
                if (dest) {
                    setDestination(dest.name);
                }
            }).catch(error => console.error("Erreur récupération destination:", error));
        }
    }, [destinationId]);

    const handleNext = () => {
        if (activeStep === 1) {
            handleCalculation(destination, dateDepart, dateRetour, nombrePersonnes);
        }
        if (activeStep === steps.length - 1) {
            handleSubmit();
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleCalculation = (destination, dateDepart, dateRetour, nombrePersonnes) => {
        // Validation de l'entrée
        if (!destination || !dateDepart || !dateRetour || nombrePersonnes < 1) {
            setPrixTotal("");
            return;
        }

        const cleanedDestination = destination.trim();
        const prixUnitaire = tarifsVoyages[cleanedDestination] || 0;
        const depart = new Date(dateDepart);
        const retour = new Date(dateRetour);

        if (isNaN(depart) || isNaN(retour)) {
            setPrixTotal("");
            return;
        }

        const diffJours = Math.max(1, (retour - depart) / (1000 * 60 * 60 * 24)); // Calcul du nombre de jours de séjour
        const total = prixUnitaire * diffJours * parseInt(nombrePersonnes);

        // Mise à jour du prix total avec 2 décimales
        setPrixTotal(total.toFixed(2));
    };

    const handleSubmit = async () => {
        // Validation des champs avant la soumission
        if (!destination || !dateDepart || !dateRetour || nombrePersonnes < 1 || !username || !email || !telephone || prixTotal === "0.00") {
            Swal.fire({
                title: "Erreur !",
                text: "Veuillez remplir tous les champs avant de soumettre.",
                icon: "error",
                confirmButtonText: "Réessayer",
            });
            return;
        }

        const departDate = new Date(dateDepart);
        const retourDate = new Date(dateRetour);

        if (isNaN(departDate.getTime()) || isNaN(retourDate.getTime())) {
            Swal.fire({
                title: "Erreur !",
                text: "Les dates de départ ou de retour sont invalides.",
                icon: "error",
                confirmButtonText: "Réessayer",
            });
            return;
        }

        const formattedDepartDate = departDate.toISOString().split("T")[0];
        const formattedRetourDate = retourDate.toISOString().split("T")[0];

        const numericPrixTotal = parseFloat(prixTotal);
        const numericNombrePersonnes = parseInt(nombrePersonnes, 10);

        try {
            console.log("Données à envoyer :", {
                user_id: userId,
                destination: destination,
                date_depart: formattedDepartDate,
                date_retour: formattedRetourDate,
                prix_total: numericPrixTotal,
                nombre_personnes: numericNombrePersonnes,
            });

            await addReservation({
                user_id: userId,
                destination: destination,
                date_depart: formattedDepartDate,
                date_retour: formattedRetourDate,
                prix_total: numericPrixTotal,
                nombre_personnes: numericNombrePersonnes
            });

            Swal.fire({
                title: "Réservation ajoutée !",
                text: `Votre réservation a été enregistrée avec succès avec un budget de ${prixTotal} Euros.`,
                icon: "success",
                confirmButtonText: "OK",
            });

            // Réinitialisation des champs après soumission
            setDestination("");
            setDateDepart("");
            setDateRetour("");
            setNombrePersonnes(1);
            setPrixTotal("");
            setUsername("");
            setEmail("");
            setTelephone("");
            setActiveStep(0);

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
        <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent : "center", height: "100vh" }}>
            <Typography variant="h5" align="center" gutterBottom>
                Réservez dès maintenant !
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ padding: 2, width: "100%" }}>
                {activeStep === 0 && (
                    <>
                        <TextField label="Nom et prénom" value={username} InputProps={{ readOnly: true }} fullWidth required margin="normal" />
                        <TextField label="Email" value={email} InputProps={{ readOnly: true }} fullWidth required margin="normal" />
                        <TextField label="Téléphone" value={telephone} InputProps={{ readOnly: true }} fullWidth required margin="normal" />
                    </>
                )}

                {activeStep === 1 && (
                    <>
                        <Autocomplete
                            options={villesMadagascar}
                            value={destination}
                            onChange={(e, newValue) => setDestination(newValue)}
                            renderInput={(params) => <TextField {...params} label="Destination" fullWidth required margin="normal" InputProps={{ readOnly: true }} />}
                        />
                        <TextField label="Date de départ" type="date" value={dateDepart} onChange={(e) => { setDateDepart(e.target.value); handleCalculation(destination, e.target.value, dateRetour, nombrePersonnes); }} fullWidth required margin="normal" />
                        <TextField label="Date de retour" type="date" value={dateRetour} onChange={(e) => { setDateRetour(e.target.value); handleCalculation(destination, dateDepart, e.target.value, nombrePersonnes); }} fullWidth required margin="normal" />
                    </>
                )}

                {activeStep === 2 && (
                    <>
                        <TextField label="Nombre de personnes" type="number" value={nombrePersonnes} onChange={(e) => { setNombrePersonnes(e.target.value); handleCalculation(destination, dateDepart, dateRetour, e.target.value); }} fullWidth required margin="normal" />
                        <TextField label="Prix Total (€)" type="text" value={prixTotal} fullWidth required margin="normal" InputProps={{ readOnly: true }} />
                    </>
                )}

                {activeStep === 3 && (
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Récapitulatif</Typography>
                            <Typography><strong>Nom:</strong> {username}</Typography>
                            <Typography><strong>Email:</strong> {email}</Typography>
                            <Typography><strong>Destination:</strong> {destination}</Typography>
                            <Typography><strong>Prix Total:</strong> {prixTotal} €</Typography>
                            <Typography><strong>Date de départ:</strong> {dateDepart}</Typography>
                            <Typography><strong>Date de retour:</strong> {dateRetour}</Typography>
                        </CardContent>
                    </Card>
                )}

                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                    <Button variant="contained" onClick={handleBack} disabled={activeStep === 0} startIcon={<ArrowBack />}>Précédent</Button>
                    <Button variant="contained" onClick={handleNext} endIcon={<ArrowForward />}>{activeStep === steps.length - 1 ? "Terminer" : "Suivant"}</Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ReservationForm;
