import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/apiUser.jsx";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    TablePagination,
    TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchTerm, users]);

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            await Swal.fire({
                title: "Suppression !",
                text: "Client supprimé avec succès",
                icon: "success",
                confirmButtonText: "OK",
            });
            fetchUsers();
        } catch (err) {
            Swal.fire({
                title: "Erreur !",
                text: "Une erreur s'est produite lors de la suppression.",
                icon: "error",
                confirmButtonText: "Réessayer",
            });
            console.log(err);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterUsers = () => {
        const filtered = users.filter((user) => {
            return (
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredUsers(filtered);
    };

    return (
        <div className="p-12">
            <Typography variant="h4" gutterBottom className="text-center text-gray-700">
                Liste des utilisateurs
            </Typography>

            {/* Champ de recherche dynamique */}
            <TextField
                label="Rechercher par nom ou email"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-6"
                style={{ maxWidth: "400px", margin: "10px 0 10px 0", display: "block" }}
            />

            <TableContainer component={Paper} className="shadow-lg rounded-lg">
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-200">
                            <TableCell className="font-bold">ID</TableCell>
                            <TableCell className="font-bold">Nom</TableCell>
                            <TableCell className="font-bold">Email</TableCell>
                            <TableCell align="right" className="font-bold">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                                <TableRow key={user.id} className="hover:bg-gray-100">
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDelete(user.id)}
                                            className="transition-all duration-300 hover:scale-105"
                                        >
                                            Supprimer
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="mt-4"
            />
        </div>
    );
};

export default UserList;
