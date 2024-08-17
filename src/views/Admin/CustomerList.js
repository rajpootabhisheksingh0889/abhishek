import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography, Box, TextField,
    Table, TableBody, TableCell, TableHead, TableRow, Button, Skeleton
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import NoData from "src/assets/images/products/NoData.jpg"; // Replace with your actual path
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const userType = localStorage.getItem('user_type');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://134.209.145.149:9999/api/listUser?role_id=1');
                // Ensure data is an array
                if (Array.isArray(response.data)) {
                    setCustomers(response.data);
                } else {
                    console.error('Unexpected data format', response.data);
                    setCustomers([]);
                }
            } catch (err) {
                console.error('Error fetching customers:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const filteredCustomers = customers?.filter(customer => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            (customer?.first_name?.toLowerCase().includes(lowerCaseSearchTerm) || '') ||
            (customer?.last_name?.toLowerCase().includes(lowerCaseSearchTerm) || '') ||
            (customer?.email?.toLowerCase().includes(lowerCaseSearchTerm) || '')
        );
    }) || []; // Ensure filteredCustomers is an array

    return (
        <DashboardCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
                    Customer List
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        size="medium"
                        label="Search Customer"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
            </Box>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
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
                            {/* <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Phone
                                </Typography>
                            </TableCell> */}
                            {userType !== 'AG' && (
                                <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Action
                                    </Typography>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(5)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="text" width={40} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={150} />
                                    </TableCell>
                                    {/* <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell> */}
                                    <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer, index) => (
                                    <TableRow key={customer.id} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                                        <TableCell>
                                            <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                                {index + 1}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {customer.first_name} {customer.last_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary">
                                                {customer.email}
                                            </Typography>
                                        </TableCell>
                                        {/* <TableCell>
                                            <Typography color="textSecondary">
                                                {customer.phone}
                                            </Typography>
                                        </TableCell> */}
                                        {userType !== 'AG' && (
                                            <TableCell>
                                                <Button variant="contained" color="primary" size="small"
                                                    onClick={() => navigate(`/custom-permissions/${customer.id}`)}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={userType !== 'AG' ? 5 : 4} sx={{ textAlign: 'center' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                                            <img src={NoData} alt="No data available" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
                {error && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <img src={NoData} alt="Error fetching data" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </Box>
                )}
            </Box>
        </DashboardCard>
    );
};

export default CustomerList;
