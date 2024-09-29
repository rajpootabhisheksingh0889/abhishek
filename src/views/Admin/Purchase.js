import React, { useEffect, useState } from 'react';
import {
    Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, TextField, Button, IconButton, Pagination
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';

const Purchase = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // For pagination
    const [totalPurchases, setTotalPurchases] = useState(0); // Total number of purchases
    const [purchasesPerPage, setPurchasesPerPage] = useState(10); // Number of items per page
    const [searchTerm, setSearchTerm] = useState(''); // For search
    const navigate = useNavigate();

    // Fetch data from API with pagination and search
    const fetchPurchases = async (page = 1, search = '') => {
        setLoading(true);
        try {
            const response = await axios.get(`http://134.209.145.149:9999/api/inventory?search=${search}&page=${page}&limit=${purchasesPerPage}`);

            setPurchases(response.data.allData);
            setTotalPurchases(response.data.totalItems);
            setCurrentPage(page); // Update the current page
        } catch (error) {
            console.error('Error fetching purchases:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchases(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    // Handle Edit action
    const handleEdit = (productId) => {
        navigate(`/addpurchase/${productId}`);
    };

    // Handle Delete action
    const handleDelete = async (id) => {
        try {
            const confirmed = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
            if (confirmed.isConfirmed) {
                await axios.delete(`http://134.209.145.149:9999/api/inventory/${id}`);
                Swal.fire('Deleted!', 'Your purchase has been deleted.', 'success');
                fetchPurchases(currentPage); // Refresh the list after deletion
            }
        } catch (error) {
            console.error('Error deleting purchase:', error);
        }
    };

    // Handle Search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Handle Page Change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Add Purchase button
    const handleAddPurchase = () => {
        navigate("/addpurchase");
    };

    return (
        <DashboardCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
                    Purchase List
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        size="medium"
                        label="Search Purchase"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleAddPurchase}
                    >
                        Add Purchase
                    </Button>
                </Box>
            </Box>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>Id</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>Product Name</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>Vendor Name</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>Price</Typography></TableCell>
                            <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Quantity</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2" fontWeight={600}>Actions</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading ? (
                            purchases.map((purchase, index) => (
                                <TableRow key={purchase.id}>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}> {index + 1}</Typography></TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>{purchase.product_name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>{purchase.vendor_name}</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant="h6">${purchase.price}</Typography></TableCell>
                                    <TableCell align="right"><Typography variant="h6">{purchase.quantity}</Typography></TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" onClick={() => handleEdit(purchase.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => handleDelete(purchase.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography>Loading...</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>

            {/* Pagination component */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Pagination
                    count={Math.ceil(totalPurchases / purchasesPerPage)} // Calculate total pages
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    disabled={loading} // Disable pagination while loading
                />
            </Box>
        </DashboardCard>
    );
};

export default Purchase;
