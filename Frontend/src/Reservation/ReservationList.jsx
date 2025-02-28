import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getReservations, deleteReservation } from "../services/apiReservation.jsx";

function Row({ row, onDelete }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.destination}
                </TableCell>
                <TableCell align="right">{row.dateDepart}</TableCell>
                <TableCell align="right">{row.dateRetour}</TableCell>
                <TableCell align="right">{row.prixTotal}€</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Détails de la réservation
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => onDelete(row.idReservation)}
                            >
                                Supprimer
                            </Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        idReservation: PropTypes.number.isRequired,
        destination: PropTypes.string.isRequired,
        dateDepart: PropTypes.string.isRequired,
        dateRetour: PropTypes.string.isRequired,
        prixTotal: PropTypes.number.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default function ReservationList() {
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
        fetchReservations(); // Mise à jour après suppression
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Destination</TableCell>
                        <TableCell align="right">Départ</TableCell>
                        <TableCell align="right">Retour</TableCell>
                        <TableCell align="right">Prix</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservations.map((res) => (
                        <Row key={res.idReservation} row={res} onDelete={handleDelete} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
