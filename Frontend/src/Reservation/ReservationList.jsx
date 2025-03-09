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
    TablePagination,
    TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getReservations, deleteReservation, updateReservationStatus } from "../services/apiReservation.jsx"; // Ajoutez la fonction pour mettre à jour le status

function Row({ row, onDelete, onStatusChange }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>{row.userId}</TableCell>
                <TableCell component="th" scope="row">
                    {row.destination}
                </TableCell>
                <TableCell align="right">{row.dateReservation}</TableCell>
                <TableCell align="right">{row.dateDepart}</TableCell>
                <TableCell align="right">{row.dateRetour}</TableCell>
                <TableCell align="right">{row.prixTotal}€</TableCell>
                <TableCell align="center">
                    <Button
                        variant={row.status === 1 ? "contained" : "outlined"} // "confirmé" si 1, "en attente" si 0
                        color={row.status === 1 ? "success" : "warning"} // Vert pour "confirmé", Jaune pour "en attente"
                        onClick={() => onStatusChange(row.idReservation)}
                    >
                        {row.status === 1 ? "Confirmé" : "En attente"} {/* Affichage du texte */}
                    </Button>
                </TableCell>
                <TableCell align="right">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => alert("Afficher les détails de la réservation")}
                        startIcon={<VisibilityIcon />}
                    >
                        {/* Afficher */}
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => alert("Éditer la réservation")}
                        startIcon={<EditIcon />}
                    >
                        {/* Éditer */}
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => onDelete(row.idReservation)}
                        startIcon={<DeleteIcon />}
                    >
                        {/* Supprimer */}
                    </Button>
                </TableCell>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Détails de la réservation
                            </Typography>
                            <Typography>
                                Détails supplémentaires peuvent être affichés ici, comme les informations de contact, les demandes spéciales, etc.
                            </Typography>
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
        email: PropTypes.string.isRequired,
        dateReservation: PropTypes.string.isRequired,
        dateDepart: PropTypes.string.isRequired,
        dateRetour: PropTypes.string.isRequired,
        prixTotal: PropTypes.number.isRequired,
        status: PropTypes.number.isRequired, // Changement de string à number pour correspondre à 0 ou 1
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
};

export default function ReservationList() {
    const [reservations, setReservations] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState(""); // Utilisation de searchQuery ici

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await getReservations();
            setReservations(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des réservations:", error);
        }
    };

    const handleDelete = async (id) => {
        await deleteReservation(id);
        fetchReservations(); // Mise à jour après suppression
    };

    const handleStatusChange = async (id) => {
        const updatedReservation = reservations.find((res) => res.idReservation === id);
        const newStatus = updatedReservation.status === 0 ? 1 : 0;
        await updateReservationStatus(id, newStatus);
        fetchReservations(); // Mise à jour après modification
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredReservations = reservations.filter((reservation) => {
        return (
            reservation.destination.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Réinitialise à la première page après changement du nombre de lignes par page
    };

    return (
        <Box>
            {/* Champ de recherche */}
            <TextField
                label="Rechercher"
                variant="outlined"
                fullWidth
                value={searchQuery} // Utilisation de searchQuery ici
                onChange={handleSearchChange}
                sx={{ marginBottom: 2 }}
            />

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Destination</TableCell>
                            <TableCell align="right">Date de réservation</TableCell>
                            <TableCell align="right">Départ</TableCell>
                            <TableCell align="right">Retour</TableCell>
                            <TableCell align="right">Prix</TableCell>
                            <TableCell align="center">Statut</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredReservations
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((res) => (
                                <Row
                                    key={res.idReservation}
                                    row={res}
                                    onDelete={handleDelete}
                                    onStatusChange={handleStatusChange}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredReservations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}
