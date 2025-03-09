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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getReservations, deleteReservation, updateReservationStatus } from "../services/apiReservation.jsx";

function Row({ row, onDelete, onStatusChange, onView, onEdit }) {
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
                        variant={row.status === 1 ? "contained" : "outlined"}
                        color={row.status === 1 ? "success" : "warning"}
                        onClick={() => onStatusChange(row.idReservation)}
                    >
                        {row.status === 1 ? "Confirmé" : "En attente"}
                    </Button>
                </TableCell>
                <TableCell align="right">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onView(row)}
                        startIcon={<VisibilityIcon />}
                    >
                        Afficher
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => onEdit(row)}
                        startIcon={<EditIcon />}
                    >
                        Éditer
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => onDelete(row.idReservation)}
                        startIcon={<DeleteIcon />}
                    >
                        Supprimer
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
        status: PropTypes.number.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default function ReservationList() {
    const [reservations, setReservations] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const response = await getReservations();
            setReservations(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des réservations:", error);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        await deleteReservation(id);
        fetchReservations();
    };

    const handleStatusChange = async (id) => {
        const updatedReservation = reservations.find((res) => res.idReservation === id);
        const newStatus = updatedReservation.status === 0 ? 1 : 0;
        setLoading(true);
        await updateReservationStatus(id, newStatus);
        fetchReservations();
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredReservations = reservations.filter((reservation) => {
        return reservation.destination.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleView = (row) => {
        setSelectedReservation(row);
        setOpenDialog(true);
    };

    const handleEdit = (row) => {
        setSelectedReservation(row);
        setOpenEditDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedReservation(null);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedReservation(null);
    };

    return (
        <Box>
            <TextField
                label="Rechercher"
                variant="outlined"
                fullWidth
                value={searchQuery}
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
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredReservations
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((res) => (
                                    <Row
                                        key={res.idReservation}
                                        row={res}
                                        onDelete={handleDelete}
                                        onStatusChange={handleStatusChange}
                                        onView={handleView}
                                        onEdit={handleEdit}
                                    />
                                ))
                        )}
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

            {/* Dialog for Viewing Reservation */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Détails de la réservation</DialogTitle>
                <DialogContent>
                    <Typography>Email: {selectedReservation?.email}</Typography>
                    <Typography>Destination: {selectedReservation?.destination}</Typography>
                    <Typography>Date de réservation: {selectedReservation?.dateReservation}</Typography>
                    <Typography>Date de départ: {selectedReservation?.dateDepart}</Typography>
                    <Typography>Date de retour: {selectedReservation?.dateRetour}</Typography>
                    <Typography>Prix: {selectedReservation?.prixTotal}€</Typography>
                    <Typography>Status: {selectedReservation?.status === 1 ? "Confirmé" : "En attente"}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Editing Reservation */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Modifier la réservation</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Destination"
                        variant="outlined"
                        fullWidth
                        value={selectedReservation?.destination || ""}
                        // Ajoutez un champ pour mettre à jour la réservation
                    />
                    {/* Autres champs d'édition */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="secondary">
                        Annuler
                    </Button>
                    <Button
                        onClick={() => {
                            // Implémentation de la mise à jour
                            handleCloseEditDialog();
                        }}
                        color="primary"
                    >
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
