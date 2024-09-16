import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Button,
    IconButton,
    Skeleton,
    Pagination
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardCard from 'src/components/shared/DashboardCard';
import axios from 'axios';
import Swal from 'sweetalert2';

const Vendor = () => {
    const [vendors, setVendors] = useState([]); // State to store vendors data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [page, setPage] = useState(1); // Current page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [searchQuery, setSearchQuery] = useState(''); // State to handle search input
    const navigate = useNavigate();

    // Function to fetch vendor data from the API
    const fetchVendors = async (page = 1, query = '') => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(`http://134.209.145.149:9999/api/vendor?search=${query}&page=${page}`);
            setVendors(response.data.data); // Set the fetched data
            setTotalPages(response.data.totalPages); // Set total pages from response
            setPage(page); // Update the current page
        } catch (error) {
            console.error('Error fetching vendor data:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchVendors(page, searchQuery);
    }, [page, searchQuery]);

    const handleViewClick = (vendorId) => {
        console.log(`Viewing vendor with ID: ${vendorId}`);
        // Handle view action, such as navigating to a vendor detail page
    };

    const handleAddVendor = () => {
        navigate("/addvendor");
    };

    const handleEditClick = (vendorId) => {
        navigate(`/addvendor/${vendorId}`);
    };

    const handleDeleteClick = async (vendorId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://134.209.145.149:9999/api/vendor/${vendorId}`);
                    // Show success message with auto-close after 3 seconds
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Vendor has been deleted.',
                        icon: 'success',
                        timer: 3000, // Auto-close after 3 seconds
                        showConfirmButton: false
                    });

                    // Refetch vendor data after deletion
                    fetchVendors(page, searchQuery);
                } catch (error) {
                    Swal.fire('Error', 'There was an issue deleting the vendor.', 'error');
                    console.error('Error deleting vendor:', error);
                }
            }
        });
    };

    // Handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle search form submission
    const handleSearch = () => {
        fetchVendors(1, searchQuery); // Fetch vendors for the first page with the new search query
    };




    return (
        <DashboardCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
                    Vendor List
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        size="medium"
                        label="Search Vendor"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />

            

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleAddVendor}
                    >
                        Add Vendor
                    </Button>
                </Box>
            </Box>

            {loading ? (
                <Box sx={{ mt: 2 }}>
                    <Skeleton variant="rectangular" width="100%" height={60} />
                    <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 1 }} />
                    <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 1 }} />
                </Box>
            ) : (
                <>
                    <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                        <Table
                            aria-label="simple table"
                            sx={{ whiteSpace: "nowrap", mt: 2 }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Id
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Email
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Phone
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Gender
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" sx={{ backgroundColor: '#f5f5f5' }}>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Actions
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vendors.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            <Typography variant="subtitle1" color="textSecondary">
                                                No data available
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    vendors.map((vendor, index) => (
                                        <TableRow key={vendor.id}>
                                            <TableCell>
                                                <Typography variant="subtitle2">
                                                    {index + 1}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">
                                                    {vendor.name || "-"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {vendor.email || "-"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {vendor.phone || "-"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {vendor.gender || "-"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleViewClick(vendor.id)}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => handleEditClick(vendor.id)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDeleteClick(vendor.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(event, value) => fetchVendors(value, searchQuery)}
                            color="primary"
                        />
                    </Box>
                </>
            )}
        </DashboardCard>
    );
};

export default Vendor;
