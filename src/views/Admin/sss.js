import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem,
    Table, TableBody, TableCell, TableHead, TableRow, Chip, Button, Skeleton
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
    const [selectedOption, setSelectedOption] = useState('all');
    const handleChange1 = (event) => {
        setSelectedOption(event.target.value);
    };
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://134.209.145.149:9999/api/listUser?role_id=4', {
                    params: { status: selectedOption }
                });
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
    }, [selectedOption]);

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
                    <FormControl variant="outlined" size="medium">
                        <InputLabel>Select</InputLabel>
                        <Select
                            value={selectedOption}
                            onChange={handleChange1}
                            label="Select"
                            sx={{ height: '100%', minWidth: '120px' }}
                        >
                            <MenuItem value={'all'}>All</MenuItem>
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
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
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    City
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Postal Code
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    DOB
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Address
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Language
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                            {/* {userType !== 'AG' && (
                                <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Action
                                    </Typography>
                                </TableCell>
                            )} */}
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
                                    <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell>
                                    {/* <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell> */}
                                </TableRow>
                            ))
                        ) : (
                            filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer, index) => (
                                    <TableRow key={customer.id} >
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {index + 1}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {customer.first_name} {customer.last_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" >
                                                {customer.email || "-"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" >
                                                {customer.phone || "-"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" >
                                                {customer.gender || "-"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" >
                                                {customer.city_name || "-"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" >
                                                {customer.postal_code || "-"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" >
                                                {customer.dob || "-"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" >
                                                {customer.address_line1 || "-"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" >
                                                {customer.language_name || "-"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={customer.status ? 'Active' : 'Inactive'}
                                                color={customer.status ? 'success' : 'error'}
                                                sx={{ borderRadius: '4px', fontSize: '0.8rem' }}
                                            />
                                        </TableCell>
                                        {/* <TableCell>
                                            <Typography  >
                                                {customer.phone}
                                            </Typography>
                                        </TableCell> */}
                                        {/* {userType !== 'AG' && (
                                            <TableCell>
                                                <Button variant="contained" color="primary" size="small"
                                                    onClick={() => navigate(`/custom-permissions/${customer.id}`)}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        )} */}
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
